let readCfg = JSON.parse(localStorage.getItem("LyricBarBlurSettings"));
let getId = document.getElementById
function resetStyles() {
    document.getElementById("LyricBarBlurStyles").innerHTML = `
    .lyric-bar {
        background: linear-gradient(0deg, rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), 0.1), rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), 0.1)),rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), ` + JSON.parse(localStorage.getItem("LyricBarBlurSettings")).trans +`);
        backdrop-filter: blur(` + JSON.parse(localStorage.getItem("LyricBarBlurSettings")).blur + `px);
    }
    `;
    console.log("reset styles");
};
function writeCfg(Cfg) {
    localStorage.setItem("LyricBarBlurSettings", JSON.stringify(Cfg));
};
function saveCfg() {
    var blurSet = document.getElementById("blurSetBox").value;
    var transSet = document.getElementById("transSetBox").value/100;
    writeCfg({blur: blurSet, trans: transSet});
    console.log("save settings");
    resetStyles();
};
function resetCfg() {
    localStorage.removeItem("LyricBarBlurSettings");
    document.getElementById("blurSetBox").value = 12;
    document.getElementById("transSetBox").value = 75;
    document.getElementById("colorRedSetBox").value = "undefined";
    document.getElementById("colorGreenSetBox").value = "undefined";
    document.getElementById("colorBlueSetBox").value = "undefined";
    writeCfg({blur: 12, trans: 0.75});
    console.log("reset settings");
    resetStyles();
};

plugin.onAllPluginsLoaded(() => {
    let crStyle = document.createElement("style");
    let lyricBar = document.querySelector(".lyric-bar");

    if (!readCfg) {
        resetCfg();
    };

    crStyle.setAttribute("id", "LyricBarBlurStyles");
    crStyle.innerHTML = `
    .lyric-bar {
        background: linear-gradient(0deg, rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), 0.1), rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), 0.1)),rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), ` + readCfg.trans +`);
        backdrop-filter: blur(` + readCfg.blur + `px);
    }
    `;
    document.head.appendChild(crStyle);
});

plugin.onConfig(() => {
    let crCfgPage = document.createElement("div");
    crCfgPage.setAttribute("width", "100%");
    crCfgPage.setAttribute("height", "100%");
    crCfgPage.setAttribute("id", "LyricBarBlurSettings");
    crCfgPage.innerHTML = `
    <style>
        #LyricBarBlurSettings {
            --lbbs-fg: rgba(var(--md-accent-color-rgb, var(--themeC1-rgb)), 1);
            --lbbs-bg: rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), 0.3);
            color: var(--md-accent-color-secondary, var(--ncm-text));
            margin: 0px 0px 150px 0px;
            padding: 20px;
            line-height: 50px;
            font-size: 16px;
            border-radius: 10px;
            background: var(--lbbs-bg);
            backdrop-filter: blur(12px);
            max-width: 500px;
        }
        #LyricBarBlurSettings div div {
            outline: 0;
            margin: 5px 0px;
            padding: 0px 20px 15px 20px;
            border: 1px solid var(--lbbs-fg);
            border-radius: 10px;
            box-shadow: 0px 0px 3px var(--lbbs-fg);
            background: var(--lbbs-bg);
        }
        #LyricBarBlurSettings p {
            display:inline;
        }

        #LyricBarBlurSettings ::selection {
            color: var(--lbbs-bg);
            background: var(--lbbs-fg);
        }

        #LyricBarBlurSettings .button {
            color: var(--md-accent-color-secondary, var(--ncm-text));
            font-size: 16px;
            width: 90px;
            height: 40px;
            line-height: 0px;
            outline: 0;
            box-shadow: 0px 0px 3px var(--lbbs-fg);
            border: 1px solid var(--lbbs-fg);
            border-radius: 10px;
            background: var(--lbbs-bg);
            transition-duration: 0.1s;
        }
        #LyricBarBlurSettings .button:hover {
            box-shadow: 0px 0px 6px var(--lbbs-fg);
        }
        #LyricBarBlurSettings .button:active {
            font-size: 14px;
            border-width: 4px;
            box-shadow: 0px 0px 8px var(--lbbs-fg);
        }

        #LyricBarBlurSettings div div .button {
            background: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
        }

        #LyricBarBlurSettings .textBox {
            padding: 10px;
        }
        #LyricBarBlurSettings .textBox:focus {
            font-size: 15px;
            border-width: 3px;
            box-shadow: 0px 0px 8px var(--lbbs-fg);
        }

        #LyricBarBlurSettings .buttonGroupLeft {
            border-radius: 10px 0px 0px 10px;
            float: left;
        }
        #LyricBarBlurSettings .buttonGroupMiddle {
            border-radius: 0px;
            float: left;
        }
        #LyricBarBlurSettings .buttonGroupRight {
            border-radius: 0px 10px 10px 0px;
            float: left;
        }

        #LyricBarBlurSettings .selectMenu {
            padding-left: 5px;
        }

        #LyricBarBlurSettings .link {
            cursor: pointer;
            color: var(--lbbs-fg);
            background: rgba(0, 0, 0, 0);
            border: 0px solid;
        }
    </style>
    <div>
    <script type="text/javascript">
    let readCfg = JSON.parse(localStorage.getItem("LyricBarBlurSettings"));
    let getId = document.getElementById
    function resetStyles() {
        getId("LyricBarBlurStyles").innerHTML = ".lyric-bar {background: linear-gradient(0deg, rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), 0.1), rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), 0.1)),rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), " + readCfg.trans + "); backdrop-filter: blur(" + readCfg.blur + "px);}";
    };
    function writeCfg(Cfg) {
        localStorage.setItem("LyricBarBlurSettings", JSON.stringify(Cfg));
    };
    function saveCfg() {
        var settings = "{ blur: " + getId("blurSetBox").value + ", trans: " + getId("transSetBox").value/100 + "}";
        writeCfg(settings);
        resetStyles();
    };
    function resetCfg() {
        localStorage.removeItem("LyricBarBlurSettings");
        writeCfg({ blur: 12, trans: 0.75});
        resetStyles();
    };
    </script>
        <p style="font-size: 40px; line-height: 80px;">LyricBarBlur 设置</p>
        <br />
        <p>为LyricBar添加背景模糊</p>
        <br />
        <input class="button buttonGroupLeft" id="saveButton" type="button" value="保存" />
        <input class="button buttonGroupRight" id="resetButton" type="button" value="重置" />
        <br />
        <div>
            <p>背景模糊程度（数值过高可能导致背景闪烁）</p>
            <br />
            <input class="button textBox" style="width: 90px" id="blurSetBox" type="number" placeholder="12" value="` + readCfg.blur + `"/>
            <p>px</p>
        </div>
        <div>
            <p>背景不透明度</p>
            <br />
            <input class="button textBox" style="width: 90px" id="transSetBox" type="number" placeholder="75" value="` + readCfg.trans*100 + `"/>
            <p>%</p>
        </div>
        <div>
            <p>自定义背景颜色（不可用）</p>
            <br />
            <p style="color: #F00; text-shadow: 0px 1px 10px #F00;">R</p>
            <input class="button textBox" style="width: 90px" id="colorRedSetBox" type="number" placeholder="Red" value="` + readCfg.colorRed + `"/>
            <p style="color: #0F0; text-shadow: 0px 1px 10px #0F0;">G</p>
            <input class="button textBox" style="width: 90px" id="colorGreenSetBox" type="number" placeholder="Green" value="` + readCfg.colorGreen + `"/>
            <p style="color: #00F; text-shadow: 0px 1px 10px #00F;">B</p>
            <input class="button textBox" style="width: 90px" id="colorBlueSetBox" type="number" placeholder="Blue" value="` + readCfg.colorBlue + `"/>
        </div>
    </div>
    <div style="font-size: 14px; line-height: 16px; margin: 8px;">
        <p>Version 0.1.0 by Lukoning</p>
        <input class="link" style="float: right;" type="button" onclick="betterncm.ncm.openUrl('https://github.com/Lukoning/LyricBarBlur')" value="源代码(GitHub)" />
        <br />
        <input class="link" type="button" onclick="betterncm.ncm.openUrl('https://github.com/Lukoning')" value="GitHub" />
        <input class="link" type="button" onclick="betterncm.ncm.openUrl('https://space.bilibili.com/1922780115')" value="bilibili" />
        <input class="link" style="float: right;" type="button" onclick="betterncm.ncm.openUrl('https://github.com/Lukoning/LyricBarBlur/issues')" value="问题反馈(GitHub issues)" />
    </div>
    `;
    let saveBt = crCfgPage.querySelector("#saveButton");
    let resetBt = crCfgPage.querySelector("#resetButton");
    saveBt.addEventListener("click", () => {
        saveCfg();
    });
    resetBt.addEventListener("click", () => {
        resetCfg();
    });
    return crCfgPage;
});