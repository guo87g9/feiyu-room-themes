// 房间主题系统 —— 唯一的配色配置表（design/asset-license-matrix.md §3.2 / §3.3 / §3.8）。
//
// 设计契约（brief §2、矩阵 HC-1 ~ HC-10）：
//   · 4 个 key 固定 blue_white / seaside / forest / courtyard，默认 blue_white；
//   · 主题只作用于「渲染层」：材质 color、canvas 贴图色值、雾色、灯光颜色、天空渐变、菜园色值；
//     不写回玩法状态，不改户型 / 家具尺寸 / 碰撞 / 寻路 / 热区 / 菜园数值 / 昼夜判定与时长；
//   · 强度基准（sun/hemi intensity、点光 baseIntensity、indoor 系数）跨主题不变；
//   · 未知 / 非法 key 回落默认，并保留一次可诊断提示；
//   · 绝对不改动 public/room/assets/pet/ 与 public/room/assets/sound/ 下任何素材文件字节
//     （dsh-pet 为 CC BY-NC-SA 4.0，改动会触发「相同方式共享」传染）；
//   · 不修改 public/room/vendor/，不引入外部图片 / CDN / 新 3D 资产；
//   · garden-world.js 中 8 个键直接引用 world.mats.* 同一材质实例，
//     applyTheme 只改 .color，绝不重建材质实例（HC-9b）。
//
// 纯数据 + 纯函数：不 import Three.js、不碰 DOM，可直接用 Node 导入做键位完整性校验。
// 色值全部来自美术定稿矩阵 §3.2（37 个 M 键）/ §3.3（环境光）/ §3.8（73 个跨文件字段）。
// 原代码里的 canvas 贴图 / 天空渐变是 '#RRGGBB' 字符串，本表统一存 0xRRGGBB 数值，
// 渲染层用 hexToCss() 转换（矩阵 §3.8 开头要求）。

export const DEFAULT_THEME = 'blue_white';
export const THEME_KEYS = Object.freeze(['blue_white', 'seaside', 'forest', 'courtyard']);
export const THEME_STORAGE_KEY = 'home-room-theme';

export const THEME_LABELS = Object.freeze({
  blue_white: '蓝白小屋',
  seaside: '海边小屋',
  forest: '森林木屋',
  courtyard: '中式小院'
});

// 允许 URL / localStorage 里出现连字符写法（早期口径曾写作 blue-white），统一到下划线 key。
const ALIASES = Object.freeze({ 'blue-white': 'blue_white', bluewhite: 'blue_white' });

export function normalizeThemeName(name) {
  if (typeof name !== 'string') return null;
  const key = name.trim().toLowerCase();
  const resolved = ALIASES[key] || key;
  return THEME_KEYS.includes(resolved) ? resolved : null;
}

export function getTheme(name) {
  return THEMES[normalizeThemeName(name) || DEFAULT_THEME];
}

// 时段强度基准：上游数值，跨主题一律不变（HC-4 / §3.3）。
const TOD_INTENSITY = Object.freeze({
  night: { sunIntensity: 0.18, hemiIntensity: 0.16 },
  dawn: { sunIntensity: 1.15, hemiIntensity: 0.34 },
  dusk: { sunIntensity: 1.25, hemiIntensity: 0.32 },
  day: { sunIntensity: 2.45, hemiIntensity: 0.42 }
});

// 十六进制线性插值，用来从「day 基准」推导未逐项列出的时段色。
export function mixHex(a, b, t) {
  const ar = (a >> 16) & 255; const ag = (a >> 8) & 255; const ab = a & 255;
  const br = (b >> 16) & 255; const bg = (b >> 8) & 255; const bb = b & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return (r << 16) | (g << 8) | bl;
}

export const hexToCss = (hex) => `#${hex.toString(16).padStart(6, '0')}`;

// 时段调色板：day 读美术定稿 env 基准；night / dawn / dusk 用「上游时段色 × 主题 day 基准」
// 混合，只换色调不改强度。fogNight / hemiSkyNight / sunDawn / sunDusk 为美术逐主题给定值。
function buildTimeOfDay(env) {
  return {
    day: {
      sun: env.sun, hemiSky: env.hemiSky, hemiGround: env.hemiGround, fog: env.fog,
      ...TOD_INTENSITY.day
    },
    dawn: {
      sun: env.sunDawn,
      hemiSky: mixHex(0xc8c4d8, env.hemiSky, 0.35),
      hemiGround: mixHex(0x7a6a58, env.hemiGround, 0.35),
      fog: mixHex(0xcbb7b0, env.fog, 0.35),
      ...TOD_INTENSITY.dawn
    },
    dusk: {
      sun: env.sunDusk,
      hemiSky: mixHex(0xc7b8c0, env.hemiSky, 0.35),
      hemiGround: mixHex(0x6f5e50, env.hemiGround, 0.35),
      fog: mixHex(0xc9a99a, env.fog, 0.35),
      ...TOD_INTENSITY.dusk
    },
    night: {
      sun: mixHex(0x9cc0ff, env.sun, 0.15),
      hemiSky: env.hemiSkyNight,
      hemiGround: mixHex(0x2a3038, env.hemiGround, 0.25),
      fog: env.fogNight,
      ...TOD_INTENSITY.night
    }
  };
}

// buildShell / buildBathroom / buildLaundry 等处不走 M 的一次性材质（HC-5 盲区收敛）。
// 值均由本主题 M 调色板推导，保证「墙换了、地毯也跟着换」。
function buildDetails(m) {
  return {
    ground: mixHex(m.stoneDark, m.soil, 0.35),
    sea: mixHex(m.navy, m.teal, 0.55),
    ceilingSlab: m.ceiling,
    curtain: m.linenBlue,
    bathmat: m.ceramic,
    runner: m.fabricBlue,
    cloth: [m.linenBlue, m.fabricCream, m.fabricBlue, m.fabricOchre],
    bulbGlow: m.bulbWarm,
    doormat: m.stoneDark,
    windowWarm: m.bulb
  };
}

// ── 跨主题不变量（矩阵 §3.8.5，单列一区便于审计）─────────────────────────
// 这些值在 4 套主题里必须同值；随主题换色相会破坏玩法可读性 / 文字对比度 / 昼夜语义。
export const INVARIANTS = Object.freeze({
  // 9 项作物语义色：番茄必须红、茄子必须紫、玉米必须黄，四套同值。
  cropSemanticColors: Object.freeze({
    red: 0xc84b3e, pink: 0xbf4d66, orange: 0xe0943d, yellow: 0xe0bd57,
    purple: 0x624065, greenFruit: 0x62884b, cucumber: 0x3e7345,
    white: 0xf2e6c9, potato: 0xb69762
  }),
  gardenSelected: 0xffda7d,             // 交互焦点兜底高亮，四套固定
  gardenSelectedEmissive: 0x9d6b23,
  // 热区双层描边（§4.5）：不受光照影响、跨主题固定，亮底用深色、暗底用亮色。
  hotspotOutlineDark: 0x2c2e33,
  hotspotOutlineBright: 0xffda7d,
  buildLabelText: 0x2c2e33,             // 3D 房间标签深色字
  signFg: 0x2c3a32,                    // 菜牌深色字 / 框
  // 粒子语义色相：水蓝 / 种子米 / 土棕，只调色温，不换色相。
  particleHues: Object.freeze({ water: 'blue', seed: 'beige', earth: 'brown' }),
  // 天空天体 / 云 / 远山剪影 / 海平线亮带：几何与亮度语义固定（见 world.js）。
  skyCelestialsFixed: true,
  // 时段判定阈值与强度基准：全部沿用上游（TOD_INTENSITY + world.js 判定）。
  timeThresholdsFixed: true,
  // screen / deskScreen 是 canvasTex 生成的 emissiveMap，内容色固定，主题不改。
  screensContentFixed: true,
  // 几何体数量 / draw call / 材质数量：四套同一量级（HC-2）。
  geometryBudgetFixed: true
});

// ── 主色值表（37 个 M 键，逐字对齐 world.js 的 M 对象）─────────────────────
// 来源：矩阵 §3.2。screen / deskScreen 不纳入（emissiveMap 非纯色）。
const MATS = {
  blue_white: {
    wall: 0xe8edf3, wallWarm: 0xe5e3da, ceiling: 0xf4f7fa, base: 0xd2dae2,
    oakLight: 0xd6b98c, oak: 0xc09a6b, walnut: 0x7a5a3f, darkWood: 0x50382a,
    white: 0xf6f8fa, cream: 0xeae4d8, linen: 0xd6dde6, linenBlue: 0x8fa8c4,
    navy: 0x273b57, blue: 0x4d7fb8, teal: 0x4d7f7c, brass: 0xc0a068, steel: 0xb8c4cc,
    black: 0x1a1c20, dark: 0x2c2e33, stone: 0xdadfe4, stoneDark: 0x8b939b,
    plant: 0x4f7a52, plantLight: 0x6d9a63, soil: 0x44362a, terracotta: 0xb2745a,
    ceramic: 0xe2edf2, fabric: 0x93a7bd, fabricBlue: 0x5b83b0, fabricCream: 0xe6ded0,
    fabricOchre: 0xc99a62, glass: 0xbfe3ff, glassFrost: 0xd7e6ee, mirror: 0xdde9ee,
    wallGhost: 0xe8edf3, bulb: 0xffd9a0, bulbOff: 0xbfb6a8, bulbWarm: 0xffe3b8
  },
  seaside: {
    wall: 0xf2ebdd, wallWarm: 0xe9dfc8, ceiling: 0xfaf5ea, base: 0xd9cdb5,
    oakLight: 0xe0cdb0, oak: 0xcbb294, walnut: 0x8c7157, darkWood: 0x5b4a39,
    white: 0xfaf7ef, cream: 0xf0e5cf, linen: 0xe3e2d6, linenBlue: 0x9dbecb,
    navy: 0x2c4a5c, blue: 0x5f9bb5, teal: 0x4f9b98, brass: 0xc3ab77, steel: 0xc2cdd0,
    black: 0x20262a, dark: 0x33404a, stone: 0xe0e4df, stoneDark: 0x9aa8a4,
    plant: 0x5a8560, plantLight: 0x83a976, soil: 0x4a4034, terracotta: 0xc08a6c,
    ceramic: 0xe6f0ec, fabric: 0xa8c2c4, fabricBlue: 0x6fa2bb, fabricCream: 0xeee4d2,
    fabricOchre: 0xd0a874, glass: 0xc4eaf2, glassFrost: 0xdceceb, mirror: 0xe2eff0,
    wallGhost: 0xf2ebdd, bulb: 0xffdfae, bulbOff: 0xc2beb1, bulbWarm: 0xffe7c0
  },
  forest: {
    wall: 0xe6ddc8, wallWarm: 0xd8c9ae, ceiling: 0xeee5d2, base: 0xa89073,
    oakLight: 0xc29968, oak: 0xa87a4c, walnut: 0x5d3d28, darkWood: 0x3c281c,
    white: 0xf0e8d8, cream: 0xe2d3b8, linen: 0xc9bda6, linenBlue: 0x7f8f86,
    navy: 0x2b3a30, blue: 0x5a7a6c, teal: 0x4a7060, brass: 0xb08a4e, steel: 0xa9aca0,
    black: 0x1b1a17, dark: 0x2d2a24, stone: 0xcfc7b5, stoneDark: 0x7f7a6c,
    plant: 0x3f6b42, plantLight: 0x67914f, soil: 0x3a2e21, terracotta: 0x9e6247,
    ceramic: 0xd9dcc9, fabric: 0x8b8f78, fabricBlue: 0x64806a, fabricCream: 0xdcd0b4,
    fabricOchre: 0xb98a4e, glass: 0xc3dcc4, glassFrost: 0xd5ddd0, mirror: 0xdce3d5,
    wallGhost: 0xe6ddc8, bulb: 0xffc879, bulbOff: 0xa89b86, bulbWarm: 0xffd79a
  },
  courtyard: {
    wall: 0xeee9dc, wallWarm: 0xe3d9c4, ceiling: 0xf2ece0, base: 0x6b6f6c,
    oakLight: 0xbe8a5c, oak: 0xa06b45, walnut: 0x4e3021, darkWood: 0x321f16,
    white: 0xf5f0e4, cream: 0xe8dcc2, linen: 0xd4c8ac, linenBlue: 0x7b8f92,
    navy: 0x2c3b42, blue: 0x59798a, teal: 0x4c7773, brass: 0xb58b4c, steel: 0x9fa8a8,
    black: 0x1d1c1a, dark: 0x30302c, stone: 0xc9ccc6, stoneDark: 0x7d8580,
    plant: 0x466b45, plantLight: 0x6f9159, soil: 0x3d3226, terracotta: 0xa85a42,
    ceramic: 0xdfe6df, fabric: 0x9a8f7c, fabricBlue: 0x6d8792, fabricCream: 0xe4d7bb,
    fabricOchre: 0xb5503c, glass: 0xc7ded9, glassFrost: 0xd8e0d9, mirror: 0xdbe4dc,
    wallGhost: 0xeee9dc, bulb: 0xffb867, bulbOff: 0xa39a88, bulbWarm: 0xffcf87
  }
};

// ── 环境与灯光（§3.3）──────────────────────────────────────────────────────
const ENV = {
  blue_white: {
    fog: 0xa8c0d2, hemiSky: 0xbcd7f0, hemiGround: 0x8a7a66, sun: 0xfff2dd,
    pointLightMain: 0xffd6a6, pointLightAccent: 0xffc98c,
    fogNight: 0x0c1828, hemiSkyNight: 0x6f8fb8, sunDawn: 0xffc79a, sunDusk: 0xffb187
  },
  seaside: {
    fog: 0xbcd8dd, hemiSky: 0xcfe9f2, hemiGround: 0x9a9a86, sun: 0xfff6e4,
    pointLightMain: 0xffe0b8, pointLightAccent: 0xffd2a0,
    fogNight: 0x0e2028, hemiSkyNight: 0x6f9aa8, sunDawn: 0xffd0a4, sunDusk: 0xffbd92
  },
  forest: {
    fog: 0xb9c2ae, hemiSky: 0xc7d6c0, hemiGround: 0x6b5a44, sun: 0xffe9c4,
    pointLightMain: 0xffc482, pointLightAccent: 0xffb774,
    fogNight: 0x101a12, hemiSkyNight: 0x6a7f6a, sunDawn: 0xffb878, sunDusk: 0xffa466
  },
  courtyard: {
    fog: 0xc9c8bd, hemiSky: 0xd3d8cc, hemiGround: 0x8a7c66, sun: 0xffeed2,
    pointLightMain: 0xffbe78, pointLightAccent: 0xffa85e,
    fogNight: 0x141a1c, hemiSkyNight: 0x718290, sunDawn: 0xffcf9e, sunDusk: 0xffbb88
  }
};

// ── 交互点缀色（唯一一支，非 M 键；落 UI CSS 变量 --theme-accent）────────────
// T1 海玻璃青 0x3f9c98 (H≈177°) 与 T2 炉火橙 0xe8893c (H≈27°) 相差约 150°，
// 满足矩阵 §4.3.1 的 ≥120° 下限；木作明度差（oak / walnut / darkWood）同样达标，照抄不调。
const ACCENTS = {
  blue_white: 0xd8b570,  // 白金
  seaside: 0x3f9c98,     // 海玻璃青
  forest: 0xe8893c,      // 炉火橙
  courtyard: 0xc0432f    // 朱砂
};

// ── §3.8.1 world.js canvas 贴图基色（18 字段，0xRRGGBB）────────────────────
const TEXTURES = {
  blue_white: {
    tileKitchenMain: 0xe8ebee, tileKitchenGrout: 0xc4ccd4,
    tileBathMain: 0xe2ebf0, tileBathGrout: 0xb4c4d0,
    tileBalconyMain: 0xc9cdd4, tileBalconyGrout: 0x9fa9b4,
    rugLivingMain: 0x8fa3bd, rugLivingBorder: 0x273b57, rugLivingAccent: 0xd8b570,
    rugBedMain: 0xb9c6d6, rugBedBorder: 0x5279a3, rugBedAccent: 0xe6ded0,
    woodFloorBase: 0xc09a6b, woodFloorLight: 0xf4f7fa,
    notePaper: 0xf0f3f7, noteTape: 0xc0a068,
    memoryBoard: 0x4a3326, buildLabelText: 0x2c2e33
  },
  seaside: {
    tileKitchenMain: 0xf0ece0, tileKitchenGrout: 0xd4cbb4,
    tileBathMain: 0xe6f0ec, tileBathGrout: 0xbfd0cb,
    tileBalconyMain: 0xdcd0b8, tileBalconyGrout: 0xb9a98d,
    rugLivingMain: 0xa8c2c4, rugLivingBorder: 0x4f9b98, rugLivingAccent: 0x3f9c98,
    rugBedMain: 0xd0dedb, rugBedBorder: 0x6fa2bb, rugBedAccent: 0xfaf5ea,
    woodFloorBase: 0xcbb294, woodFloorLight: 0xfaf5ea,
    notePaper: 0xf7f0df, noteTape: 0xd0a874,
    memoryBoard: 0x5b4a39, buildLabelText: 0x2c2e33
  },
  forest: {
    tileKitchenMain: 0xe4dcc9, tileKitchenGrout: 0xb9ae96,
    tileBathMain: 0xd9dcc9, tileBathGrout: 0xa8ac9a,
    tileBalconyMain: 0xc9bda6, tileBalconyGrout: 0x9a8a70,
    rugLivingMain: 0x8b8f78, rugLivingBorder: 0x3c281c, rugLivingAccent: 0xe8893c,
    rugBedMain: 0xc9bda6, rugBedBorder: 0x64806a, rugBedAccent: 0xeee5d2,
    woodFloorBase: 0xa87a4c, woodFloorLight: 0xeee5d2,
    notePaper: 0xe2d3b8, noteTape: 0xb98a4e,
    memoryBoard: 0x3c281c, buildLabelText: 0x2c2e33
  },
  courtyard: {
    tileKitchenMain: 0xeee9dc, tileKitchenGrout: 0xc2c0b4,
    tileBathMain: 0xdfe6df, tileBathGrout: 0xb3bebb,
    tileBalconyMain: 0xc9ccc6, tileBalconyGrout: 0x7d8580,
    rugLivingMain: 0x9a8f7c, rugLivingBorder: 0x2c3b42, rugLivingAccent: 0xc0432f,
    rugBedMain: 0xd4c8ac, rugBedBorder: 0x6d8792, rugBedAccent: 0xf5f0e4,
    woodFloorBase: 0xa06b45, woodFloorLight: 0xf2ece0,
    notePaper: 0xe8dcc2, noteTape: 0xb58b4c,
    memoryBoard: 0x321f16, buildLabelText: 0x2c2e33
  }
};

// ── §3.8.2 skyTexture(hour) 四时段渐变与海面（17 字段，0xRRGGBB）────────────
// 时段阈值（night <5 / ≥21，dawn 5–7.5，dusk 17.5–21）不动；
// 太阳 / 月亮、云、远山剪影、海平线亮带属几何与亮度语义，跨主题固定（world.js 内常量）。
const SKY = {
  blue_white: {
    dayTop: 0x6fa9d8, dayMid: 0xb9d8ee, dayLow: 0xe8f1f4,
    nightTop: 0x050b17, nightMid: 0x0b1930, nightLow: 0x1a2c44,
    dawnTop: 0x3d4f78, dawnMid: 0xa9778f, dawnLow: 0xf0b07c,
    duskTop: 0x4e5b7d, duskMid: 0xc58a7a, duskLow: 0xf4c08a,
    seaDay: 0x4c7d99, seaDayBottom: 0x1b3d52, seaDusk: 0x5f728e,
    seaNight: 0x0b1a2b, seaNightBottom: 0x050d16
  },
  seaside: {
    dayTop: 0x7cc0dc, dayMid: 0xc8e9ee, dayLow: 0xf2f6ee,
    nightTop: 0x06131c, nightMid: 0x0d2430, nightLow: 0x1d3a44,
    dawnTop: 0x4a6386, dawnMid: 0xb98f96, dawnLow: 0xf6c79c,
    duskTop: 0x5b7092, duskMid: 0xcfa292, duskLow: 0xf8d0a2,
    seaDay: 0x4f9b98, seaDayBottom: 0x20525a, seaDusk: 0x6d8898,
    seaNight: 0x0b2029, seaNightBottom: 0x061318
  },
  forest: {
    dayTop: 0x7f9aa8, dayMid: 0xb9c9ae, dayLow: 0xe6e6cf,
    nightTop: 0x08120d, nightMid: 0x112018, nightLow: 0x203026,
    dawnTop: 0x4a5a6e, dawnMid: 0xa89886, dawnLow: 0xe8bd86,
    duskTop: 0x53596a, duskMid: 0xb59a7e, duskLow: 0xe9bd86,
    seaDay: 0x56796c, seaDayBottom: 0x2a4034, seaDusk: 0x6b7a70,
    seaNight: 0x0b1a14, seaNightBottom: 0x060f0b
  },
  courtyard: {
    dayTop: 0x8fa8b4, dayMid: 0xcfd8cc, dayLow: 0xf0efe6,
    nightTop: 0x0a1014, nightMid: 0x162127, nightLow: 0x27333a,
    dawnTop: 0x4c5a70, dawnMid: 0xad9692, dawnLow: 0xeec9a4,
    duskTop: 0x5c6274, duskMid: 0xc0a08c, duskLow: 0xefc9a0,
    seaDay: 0x6d8792, seaDayBottom: 0x33474c, seaDusk: 0x7b8790,
    seaNight: 0x111e24, seaNightBottom: 0x0a1116
  }
};

// ── §3.8.3 + §3.8.4 garden-world.js（27 自有 M 键 + 11 粒子/灯光/标牌 = 38）──
// 注意：timber / endgrain / darkwood / hardware / iron / ceramic / terracotta / brass
// 直接引用 world.mats.* 同一材质实例（HC-9b），不在本表里，随 §3.2 自动跟随。
// 9 项作物语义色 / selected / signFg 是跨主题不变量，四套同值（见 INVARIANTS）。
const GARDEN = {
  blue_white: {
    soil: 0x5a4130, earth: 0x70503a, clod: 0x826046, grass: 0x8aa176, grassDark: 0x688050,
    gravel: 0xc2c9cf, stone: 0xdadfe4, stone2: 0xc4cbd2,
    stem: 0x5e8237, leaf: 0x588b40, leafLight: 0x80a84d, leafDark: 0x386840,
    red: 0xc84b3e, pink: 0xbf4d66, orange: 0xe0943d, yellow: 0xe0bd57, purple: 0x624065,
    greenFruit: 0x62884b, cucumber: 0x3e7345, white: 0xf2e6c9, potato: 0xb69762,
    teal: 0x5e8882, seed: 0xd2bc86, roof: 0x4a6470, cream: 0xeae4d8,
    water: 0x5b8296, selected: 0xffda7d,
    particleWater: 0x9fd9e5, particleSeed: 0xd2bc86, particleEarth: 0x70503a,
    soilDry: 0x70503a, soilWet: 0x3a2f22,
    lanternGlow: 0xffe3b8, lanternEmissive: 0xffd9a0, lanternLight: 0xffc98c,
    signBg: 0xeae4d8, signFg: 0x2c3a32, signMatureBg: 0xe9d391
  },
  seaside: {
    soil: 0x6b5238, earth: 0x7d5d43, clod: 0x8f6c4e, grass: 0x9db287, grassDark: 0x779163,
    gravel: 0xd8cdb5, stone: 0xe0e4df, stone2: 0xc9cfc6,
    stem: 0x5f8a4a, leaf: 0x5a9360, leafLight: 0x8bb56a, leafDark: 0x3d7050,
    red: 0xc84b3e, pink: 0xbf4d66, orange: 0xe0943d, yellow: 0xe0bd57, purple: 0x624065,
    greenFruit: 0x62884b, cucumber: 0x3e7345, white: 0xf2e6c9, potato: 0xb69762,
    teal: 0x4f9b98, seed: 0xd8c8a0, roof: 0x5b7f7d, cream: 0xf0e5cf,
    water: 0x4f9ba3, selected: 0xffda7d,
    particleWater: 0xa8e2e6, particleSeed: 0xd8c8a0, particleEarth: 0x7d5d43,
    soilDry: 0x7d5d43, soilWet: 0x453424,
    lanternGlow: 0xffe7c0, lanternEmissive: 0xffdfae, lanternLight: 0xffd2a0,
    signBg: 0xf0e5cf, signFg: 0x2c3a32, signMatureBg: 0xead9a2
  },
  forest: {
    soil: 0x4a3524, earth: 0x5e422d, clod: 0x6b4c34, grass: 0x6f8a58, grassDark: 0x4f6b3f,
    gravel: 0xb0a58a, stone: 0xcfc7b5, stone2: 0xb5ac96,
    stem: 0x4c7130, leaf: 0x3f6b42, leafLight: 0x67914f, leafDark: 0x2b5034,
    red: 0xc84b3e, pink: 0xbf4d66, orange: 0xe0943d, yellow: 0xe0bd57, purple: 0x624065,
    greenFruit: 0x62884b, cucumber: 0x3e7345, white: 0xf2e6c9, potato: 0xb69762,
    teal: 0x4a7060, seed: 0xc2b184, roof: 0x3f5347, cream: 0xe2d3b8,
    water: 0x4a7068, selected: 0xffda7d,
    particleWater: 0x9fc9b4, particleSeed: 0xc2b184, particleEarth: 0x5e422d,
    soilDry: 0x5e422d, soilWet: 0x2f2419,
    lanternGlow: 0xffd79a, lanternEmissive: 0xffc879, lanternLight: 0xffb774,
    signBg: 0xe2d3b8, signFg: 0x2c3a32, signMatureBg: 0xd9c184
  },
  courtyard: {
    soil: 0x55402c, earth: 0x684c34, clod: 0x77583c, grass: 0x82936a, grassDark: 0x5f7550,
    gravel: 0xc9ccc6, stone: 0xc9ccc6, stone2: 0xb0b8b2,
    stem: 0x557a3c, leaf: 0x4d7a46, leafLight: 0x7a9a58, leafDark: 0x335c40,
    red: 0xc84b3e, pink: 0xbf4d66, orange: 0xe0943d, yellow: 0xe0bd57, purple: 0x624065,
    greenFruit: 0x62884b, cucumber: 0x3e7345, white: 0xf2e6c9, potato: 0xb69762,
    teal: 0x4c7773, seed: 0xcdbb92, roof: 0x4a5c5e, cream: 0xe8dcc2,
    water: 0x59798a, selected: 0xffda7d,
    particleWater: 0xa8cfd4, particleSeed: 0xcdbb92, particleEarth: 0x684c34,
    soilDry: 0x684c34, soilWet: 0x352a1e,
    lanternGlow: 0xffcf87, lanternEmissive: 0xffb867, lanternLight: 0xffa85e,
    signBg: 0xe8dcc2, signFg: 0x2c3a32, signMatureBg: 0xe0c78e
  }
};

function buildTheme(id) {
  const mats = MATS[id];
  const env = ENV[id];
  return Object.freeze({
    id,
    label: THEME_LABELS[id],
    mats: Object.freeze({ ...mats }),
    env: Object.freeze({ ...env }),
    timeOfDay: Object.freeze(buildTimeOfDay(env)),
    details: Object.freeze(buildDetails(mats)),
    textures: Object.freeze(TEXTURES[id]),   // §3.8.1 · 18 字段
    sky: Object.freeze(SKY[id]),             // §3.8.2 · 17 字段
    garden: Object.freeze(GARDEN[id]),       // §3.8.3+4 · 38 字段
    accent: ACCENTS[id]
  });
}

export const THEMES = Object.freeze(
  Object.fromEntries(THEME_KEYS.map((id) => [id, buildTheme(id)]))
);

/** 取某主题某时段的完整灯光 / 雾色（含固定强度基准）。 */
export function resolveLighting(theme, state = 'day') {
  const t = theme && theme.timeOfDay ? theme : getTheme(DEFAULT_THEME);
  return t.timeOfDay[state] || t.timeOfDay.day;
}

/**
 * 把主题应用到一个**已构建**的 world：只改现有材质 color、灯光 color、canvas 贴图内容，
 * 不重建场景 / 不重建材质实例 / 不碰几何，因而不会丢房间状态、不会造成 draw call 漂移。
 * 未知 key 回落默认并打印一次可诊断提示。
 * 菜园 / 天空等子系统的重绘由 world.themeHandlers 里的回调完成（见 garden-world.js）。
 */
export function applyTheme(world, name) {
  if (!world) return getTheme(name);
  const normalized = normalizeThemeName(name);
  if (name != null && !normalized) {
    console.warn(`[theme] 未知主题 key「${name}」，已回落到「${DEFAULT_THEME}」`);
  }
  const theme = getTheme(normalized || DEFAULT_THEME);
  world.themeName = theme.id;
  world.theme = theme;

  // 1) M 调色板：只写 color，保留 MeshPhysicalMaterial / metal() 的类型与透明度参数。
  for (const [key, hex] of Object.entries(theme.mats)) {
    const m = world.mats?.[key];
    if (m?.color) m.color.setHex(hex);
  }

  // 2) 不走 M 的一次性材质（HC-5）；cloth 是 4 件衣物，按顺序取数组色。
  for (const [key, value] of Object.entries(theme.details)) {
    const list = world.detailMaterials?.[key] || [];
    const colors = Array.isArray(value) ? value : null;
    list.forEach((m, i) => {
      if (m?.color) m.color.setHex(colors ? colors[i % colors.length] : value);
    });
  }

  // 3) canvas 贴图（§3.8.1 的 18 字段）：重画同一张 canvas。
  //    Texture.clone()（three r160）共享 Source，统一打 needsUpdate 即可覆盖地砖 clone。
  if (typeof world.repaintThemeTextures === 'function') world.repaintThemeTextures(theme);
  for (const t of world.themeTextureClones || []) t.needsUpdate = true;

  // 4) 灯光颜色。强度、baseIntensity、indoor 系数仍由 updateEnvironment 全权管理。
  const L = theme.env;
  if (world.hemi?.color) world.hemi.color.setHex(L.hemiSky);
  if (world.hemi?.groundColor) world.hemi.groundColor.setHex(L.hemiGround);
  if (world.sun?.color) world.sun.color.setHex(L.sun);
  for (const lamp of world.lamps || []) {
    if (lamp.color) {
      lamp.color.setHex(lamp.userData?.themeLamp === 'accent' ? L.pointLightAccent : L.pointLightMain);
    }
  }
  if (world.mats?.bulb?.color) world.mats.bulb.color.setHex(theme.mats.bulb);
  if (world.mats?.bulbWarm?.color) world.mats.bulbWarm.color.setHex(theme.mats.bulbWarm);

  // 5) 子系统（菜园自有材质 / 粒子 / 灯光 / 菜牌）由注册进来的回调重绘。
  for (const fn of world.themeHandlers || []) {
    try { fn(theme); } catch (e) { console.warn('[theme] 子系统重绘回调失败', e); }
  }

  // 6) 雾立即生效；天空靠清空 lastSkyKey 让下一次 updateEnvironment 用新主题重建。
  if (world.scene?.fog?.color) world.scene.fog.color.setHex(L.fog);
  world.lastSkyKey = '';
  return theme;
}
