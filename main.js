let readCfg = JSON.parse(localStorage.getItem("LyricBarBlurSettings"));
let crStyle = document.createElement("style");
let getId = document.getElementById;

function resetStyles() { //应用新设置
    let readCfg = JSON.parse(localStorage.getItem("LyricBarBlurSettings"));

    if (readCfg.blurCompel) {
        var isBlurCompel = "!important";
    } else {
        var isBlurCompel = "";
    }
    if (readCfg.colorCompel) {
        var isColorCompel = "!important";
    } else {
        var isColorCompel = "";
    }

    var cssBgDefault = `
    .lyric-bar {
        background: linear-gradient(0deg, rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), ` + readCfg.trans/10 +`), rgba(var(--md-accent-color-rgb, var(--ncm-fg-rgb)), ` + readCfg.trans/10 +`)),rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), ` + readCfg.trans +`) ` + isColorCompel + `;
        backdrop-filter: blur(` + readCfg.blur + `px) ` + isBlurCompel + `;
    }
    `;

    var cssBgColor = `
    .lyric-bar {
        background: rgba(` + readCfg.colorRed + `,` + readCfg.colorGreen + `,` + readCfg.colorBlue + `,` + readCfg.trans +`) ` + isColorCompel + `;
        backdrop-filter: blur(` + readCfg.blur + `px) ` + isBlurCompel + `;
    }
    `;



    if (readCfg.color) {
        try {
            document.getElementById("LyricBarBlurStyles").innerHTML = cssBgColor;
        } catch {
            crStyle.innerHTML = cssBgColor;
        }
    } else {
        try {
            document.getElementById("LyricBarBlurStyles").innerHTML = cssBgDefault;
        } catch {
            crStyle.innerHTML = cssBgDefault;
        }
    }
    console.log("reset styles");
};

function writeCfg(Cfg) { //写配置
    localStorage.setItem("LyricBarBlurSettings", JSON.stringify(Cfg));
};

function saveCfg() { //保存设置

    //获取纯数字设置
    function getNumSet(name, min, max) {
        let bName = name + "SetBox";
        console.log("get " + bName);

        var set = document.getElementById(bName).value*1;
        if (min != "n" && set < min) {
            set = min;
            document.getElementById(bName).value = min;
        }
        if (max != "n" && set > max) {
            set = max;
            document.getElementById(bName).value = max;
        };

        console.log(bName + " = " + set);
        return set;
    };

    //获取开关设置
    function getSwitchSet(name) {
        let sName = name + "Switch";
        console.log("get " + sName);
        var set = document.getElementById(sName).checked;
        console.log(sName + " = " + set);
        return set;
    };

    var blur = getNumSet("blur", 0, "n");
    var blurC = getSwitchSet("blurCompel");
    var trans = getNumSet("trans", 0, 100);
    var color = getSwitchSet("color");
    var colorR = getNumSet("colorRed", 0, 255);
    var colorG = getNumSet("colorGreen", 0, 255);
    var colorB= getNumSet("colorBlue", 0, 255);
    var colorC = getSwitchSet("colorCompel");

    writeCfg({
        blur: blur,
        blurCompel: blurC,
        trans: trans/100,
        color: color,
        colorRed: colorR,
        colorGreen: colorG,
        colorBlue: colorB,
        colorCompel: colorC,
    });
    console.log("save settings");
    resetStyles();
};

function resetCfg() { //重置设置
    localStorage.removeItem("LyricBarBlurSettings");
    document.getElementById("blurSetBox").value = 12;
    document.getElementById("blurCompelSwitch").checked = false;
    document.getElementById("transSetBox").value = 75;
    document.getElementById("colorSwitch").checked = false;
    document.getElementById("colorRedSetBox").value = 0;
    document.getElementById("colorGreenSetBox").value = 0;
    document.getElementById("colorBlueSetBox").value = 0;
    document.getElementById("colorCompelSwitch").checked = false;
    writeCfg({
        blur: 12,
        blurCompel: false,
        trans: 0.75,
        color: false,
        colorRed: 0,
        colorGreen: 0,
        colorBlue: 0,
        colorCompel: false,
    });
    console.log("reset settings");
    resetStyles();
};

plugin.onAllPluginsLoaded(() => {

    let lyricBar = document.querySelector(".lyric-bar");

    //初始化设置
    if (!readCfg) {
        resetCfg();
    };

    crStyle.setAttribute("id", "LyricBarBlurStyles");
    resetStyles();
    document.head.appendChild(crStyle);
});

plugin.onConfig(() => {

    //开关设置读取
    if (readCfg.blurCompel) {
        var blurCompelSwitchChecked = "Checked";
    } else {
        var blurCompelSwitchChecked = "";
    }
    
    if (readCfg.color) {
        var colorSwitchChecked = "Checked";
    } else {
        var colorSwitchChecked = "";
    }
    
    if (readCfg.colorCompel) {
        var colorCompelSwitchChecked = "Checked";
    } else {
        var colorCompelSwitchChecked = "";
    }

    //创建DOM
    let crCfgPage = document.createElement("div");
    crCfgPage.setAttribute("width", "100%"); //防止背景
    crCfgPage.setAttribute("height", "100%");//遮罩出bug
    crCfgPage.setAttribute("id", "LyricBarBlurSettings");
    crCfgPage.innerHTML = `
    <style>
        #LyricBarBlurSettings {
            --lbbs-fg: rgba(var(--md-accent-color-rgb, var(--themeC1-rgb)), 1);
            --lbbs-bg: rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), 0.3);
            --lbbs-bg-wot: rgba(var(--md-accent-color-bg-rgb, var(--ncm-bg-rgb)), 1);
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

        #LyricBarBlurSettings p {
            display:inline;
        }

        #LyricBarBlurSettings ::selection {
            color: var(--lbbs-bg-wot);
            background: var(--lbbs-fg);
        }

        #LyricBarBlurSettings .secondLayers {
            outline: 0;
            margin: 5px 0px;
            padding: 0px 20px 15px 20px;
            border: 1px solid var(--lbbs-fg);
            border-radius: 10px;
            box-shadow: 0px 0px 3px var(--lbbs-fg);
            background: var(--lbbs-bg);
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
            transition: 0.1s;
        }
        #LyricBarBlurSettings .button:hover {
            box-shadow: 0px 0px 6px var(--lbbs-fg);
        }
        #LyricBarBlurSettings .button:active {
            font-size: 14px;
            border-width: 4px;
            box-shadow: 0px 0px 8px var(--lbbs-fg);
        }

        #LyricBarBlurSettings .textBox {
            padding: 10px;
        }
        #LyricBarBlurSettings .textBox:focus {
            font-size: 15px;
            border-width: 3px;
            box-shadow: 0px 0px 8px var(--lbbs-fg);
        }

        
        #LyricBarBlurSettings .switch {
            position: relative;
            margin: 0px 50px 0px 0px;
            display: inline-block;
        }
        #LyricBarBlurSettings .switch input { 
            opacity: 0;
            width: 0;
            height: 0;
        }

        #LyricBarBlurSettings .slider {
            position: absolute;
            width: 50px;
            height: 25px;
            margin: 12.5px 0px;
            border-radius: 8px;
            transition: 0.1s;
        }
        #LyricBarBlurSettings .slider:active {
            border-width: 3px;
        }

        #LyricBarBlurSettings input:checked + .slider {
            border: 1px solid var(--lbbs-bg);
            background: var(--lbbs-fg);
        }
        #LyricBarBlurSettings input:checked + .slider:active {
            border-width: 3px;
        }

        #LyricBarBlurSettings .slider::before {
            position: absolute;
            content: "";
            height: 15px;
            width: 15px;
            left: 4px;
            bottom: 4px;
            border-radius: 4px;
            background: var(--lbbs-fg);
            transition: 0.1s;
        }
        #LyricBarBlurSettings .slider:active::before {
            height: 11px;
            width: 11px;
            border-radius: 3px;
        }

        #LyricBarBlurSettings input:checked + .slider::before {
            background: var(--lbbs-bg-wot);
            transform: translateX(25px);
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
        <p style="font-size: 40px; line-height: 80px;">LyricBarBlur 设置</p>
        <br />
        <p>为LyricBar添加背景模糊</p>
        <br />
        <input class="button buttonGroupLeft" id="saveButton" type="button" value="应用" />
        <input class="button buttonGroupRight" id="resetButton" type="button" value="恢复默认" />
        <br />
        <div class="secondLayers">
            <p>背景模糊程度（数值过高可能导致背景闪烁）</p>
            <br />
            <input class="button textBox" style="width: 90px" id="blurSetBox" type="number" step="0.1" placeholder="12" value="` + readCfg.blur + `"/>
            <p>px</p>
            <br />
            <label class="switch">
                <input id="blurCompelSwitch" type="checkbox" ` + blurCompelSwitchChecked + `>
                <span class="slider button"></span>
            </label>
            <p>覆盖其他插件的设置</p>
            </div>
        </div>
        <p style="font-size: 20px; line-height: 60px;">颜色设置</p>
        <div class="secondLayers">
            <p>背景不透明度</p>
            <br />
            <input class="button textBox" style="width: 90px" id="transSetBox" type="number" step="0.1" placeholder="75" value="` + readCfg.trans*100 + `"/>
            <p>%</p>
            <br />
            <div class="secondLayers">
                <label class="switch">
                    <input id="colorSwitch" type="checkbox" ` + colorSwitchChecked + `>
                    <span class="slider button"></span>
                </label>
                <p>自定义背景颜色</p>
                <br />
                <p style="color: #F00; text-shadow: 0px 1px 10px #F00;">R</p>
                <input class="button textBox" style="width: 90px" id="colorRedSetBox" type="number" step="1" value="` + readCfg.colorRed + `"/>
                <p style="color: #0F0; text-shadow: 0px 1px 10px #0F0;">G</p>
                <input class="button textBox" style="width: 90px" id="colorGreenSetBox" type="number" step="1" value="` + readCfg.colorGreen + `"/>
                <p style="color: #00F; text-shadow: 0px 1px 10px #00F;">B</p>
                <input class="button textBox" style="width: 90px" id="colorBlueSetBox" type="number" step="1" value="` + readCfg.colorBlue + `"/>
            </div>
            <label class="switch">
                <input id="colorCompelSwitch" type="checkbox" ` + colorCompelSwitchChecked + `>
                <span class="slider button"></span>
            </label>
            <p>覆盖其他插件的设置</p>
        </div>
    </div>
    <div style="font-size: 14px; line-height: 16px; margin: 8px;">
        <p>Version 0.1.2 by Lukoning</p>
        <input class="link" style="float: right;" type="button" onclick="betterncm.ncm.openUrl('https://github.com/Lukoning/LyricBarBlur')" value="源代码(GitHub)" />
        <br />
        <input class="link" type="button" onclick="betterncm.ncm.openUrl('https://github.com/Lukoning')" value="GitHub" />
        <input class="link" type="button" onclick="betterncm.ncm.openUrl('https://space.bilibili.com/1922780115')" value="bilibili" />
        <input class="link" style="float: right;" type="button" onclick="betterncm.ncm.openUrl('https://github.com/Lukoning/LyricBarBlur/issues')" value="问题反馈(GitHub issues)" />
    </div>
    `;
    //创建监听器(因为用不了onclick)
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