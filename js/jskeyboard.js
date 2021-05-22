var jsKeyboard = {
    settings: {
        buttonClass: "button", // default button class
        onclick: "jsKeyboard.write();", // default onclick event for button
        keyClass: "key", // default key class used to define style of text of the button
        text: {
            close: "close"
        }
    },
    "keyboard": [], // different keyboards can be set to this variable in order to switch between keyboards easily.
    init: function(elem, keyboard) {
        jsKeyboard.keyboard["default"] = jsKeyboard.defaultKeyboard;
        jsKeyboard.keyboardLayout = elem;

        if (keyboard != null && keyboard != undefined)
            jsKeyboard.generateKeyboard(keyboard);
        else
            jsKeyboard.generateKeyboard("default");

        jsKeyboard.addKeyDownEvent();

         jsKeyboard.show();
         jQuery(':input').not('[type="reset"]').not('[type="submit"]').on('focus, click', function(e)
         {
            jsKeyboard.currentElement = jQuery(this);
            jsKeyboard.currentElementCursorPosition = jQuery(this).getCursorPosition();
            console.log('keyboard is now focused on '+jsKeyboard.currentElement.attr('name')+' at pos('+jsKeyboard.currentElementCursorPosition+')');
         });
    },
    focus: function(t) {
        jsKeyboard.currentElement = jQuery(t);
        jsKeyboard.show();
    },
    keyboardLayout: "", // it shows the html element where keyboard is generated
    currentKeyboard: "default", // it shows the which keyboard is used. If it's not set default keyboard is used.
    currentElement: null,
    generateKeyboard: function(keyboard) {
        var bClass = "";
        var kClass = "";
        var onclick = "";
        var text = "";

        var s = "";
        s += "<div id=\"keyboard\">";
        s += "<div id=\"keyboardHeader\">";
        
        s += "</div>";
        
        
        
        /*small letter */
        s += "<div id=\"keyboardSmallLetter\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].smallLetter, function(i, key) {
            generate(key);
        });
        s += "</div>";

        /*capital letter*/
        s += "<div id=\"keyboardCapitalLetter\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].capitalLetter, function(i, key) {
            generate(key);
        });
        s += "</div>";

        /*number*/
        s += "<div id=\"keyboardNumber\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].number, function(i, key) {
            generate(key);
        });
        s += "</div>";

        /*symbols*/
        s += "<div id=\"keyboardSymbols\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].symbols, function(i, key) {
            generate(key);
        });
        s += "</div>";
        /*Dk Rhota */
        s += "<div id=\"keyboardDkRhota\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].dkRhota, function(i, key) {
            generate(key);
        });
        s += "</div>";
        
        /*Dk Hat */
        s += "<div id=\"keyboardDkHat\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].dkHat, function(i, key) {
            generate(key);
        });
        s += "</div>";
        
        /*Dk Hi Dot */
        s += "<div id=\"keyboardDkHiDot\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].dkHiDot, function(i, key) {
            generate(key);
        });
        s += "</div>";

        /*Dk Lo Dot */
        s += "<div id=\"keyboardDkLoDot\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].dkLoDot, function(i, key) {
            generate(key);
        });
        s += "</div>";
        
        /*Shift*/
        s += "<div id=\"keyboardShift\">";
        jQuery.each(jsKeyboard.keyboard[keyboard].shift, function(i, key) {
            generate(key);
        });
        s += "</div>";

        function generate(key) {
            bClass = key.buttonClass == undefined ? jsKeyboard.settings.buttonClass : key.buttonClass;
            kClass = key.keyClass == undefined ? jsKeyboard.settings.keyClass : key.keyClass;
            onclick = key.onclick == undefined ? jsKeyboard.settings.onclick.replace("()", "(" + key.value + ")") : key.onclick;

            text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);

            s += "<div class=\"" + bClass + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></div>";

            bClass = ""; kClass = ""; onclick = ""; text = "";
        }

        jQuery("#" + jsKeyboard.keyboardLayout).html(s);
    },
    addKeyDownEvent: function() {
        jQuery("#keyboardCapitalLetter > div.button, #keyboardSmallLetter > div.button, #keyboardNumber > div.button, #keyboardSymbols > div.button").
            bind('mousedown', (function() { jQuery(this).addClass("buttonDown"); })).
            bind('mouseup', (function() { jQuery(this).removeClass("buttonDown"); })).
            bind('mouseout', (function() { jQuery(this).removeClass("buttonDown"); }));

            //key focus down on actual keyboard key presses
            //todo:....

    },
    changeToSmallLetter: function() {
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSymbols,#keyboardDkRhota,#keyboardDkHat,#keyboardDkLoDot,#keyboardDkHiDot,#keyboardShift").css("display", "none");
        jQuery("#keyboardSmallLetter").css("display", "block");
    },
    changeToCapitalLetter: function() {
        jQuery("#keyboardCapitalLetter").css("display", "block");
        jQuery("#keyboardSmallLetter,#keyboardNumber,#keyboardSymbols,#keyboardDkRhota,#keyboardDkHat,#keyboardDkLoDot,#keyboardDkHiDot,#keyboardShift").css("display", "none");
    },
    changeToNumber: function() {
        jQuery("#keyboardNumber").css("display", "block");
        jQuery("#keyboardSymbols,#keyboardCapitalLetter,#keyboardSmallLetter,#keyboardDkRhota,#keyboardDkHat,#keyboardDkLoDot,#keyboardDkHiDot,#keyboardShift").css("display", "none");
    },
    changeToSymbols: function() {
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter,#keyboardDkRhota,#keyboardDkHat,#keyboardDkLoDot,#keyboardDkHiDot,#keyboardShift").css("display", "none");
        jQuery("#keyboardSymbols").css("display", "block");
    },
    changeToDkRhota: function(){
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter,#keyboardSymbols,#keyboardDkHat,#keyboardDkLoDot,#keyboardDkHiDot,#keyboardShift").css("display", "none");
        jQuery("#keyboardDkRhota").css("display", "block");
    },
    changeToDkHat: function(){
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter,#keyboardSymbols,#keyboardDkRhota,#keyboardDkLoDot,#keyboardDkHiDot,#keyboardShift").css("display", "none");
        jQuery("#keyboardDkHat").css("display", "block");
    },
    changeToDkLoDot: function(){
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter,#keyboardSymbols,#keyboardDkRhota,#keyboardDkHat,#keyboardDkHiDot,#keyboardShift").css("display", "none");
        jQuery("#keyboardDkLoDot").css("display", "block");
    },
    changeToDkHiDot: function(){
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter,#keyboardSymbols,#keyboardDkRhota,#keyboardDkHat,#keyboardDkLoDot,#keyboardShift").css("display", "none");
        jQuery("#keyboardDkHiDot").css("display", "block");
    },
    changeToShift: function(){
        jQuery("#keyboardCapitalLetter,#keyboardNumber,#keyboardSmallLetter,#keyboardSymbols,#keyboardDkRhota,#keyboardDkHat,#keyboardDkLoDot,#keyboardDkHiDot").css("display", "none");
        jQuery("#keyboardShift").css("display", "block");
    },
    updateCursor: function()
    {
        //input cursor focus and position during typing
        jsKeyboard.currentElement.setCursorPosition(jsKeyboard.currentElementCursorPosition);
    },
    write: function(m) {
        var a = jsKeyboard.currentElement.val(),
            b = String.fromCharCode(m),
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
        jsKeyboard.updateCursor();
    },
    del: function() {
        var a = jsKeyboard.currentElement.val(),
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos-1), a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition--; //-1 cursor
        jsKeyboard.updateCursor();
    },
    enter: function() {
        var t = jsKeyboard.currentElement.val();
        jsKeyboard.currentElement.val(t + "\n");
    },
    space: function() {
        var a = jsKeyboard.currentElement.val(),
            b = " ",
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
        jsKeyboard.updateCursor();
    },
    writeSpecial: function(m) {
        var a = jsKeyboard.currentElement.val(),
            b = String.fromCharCode(m),
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
        jsKeyboard.updateCursor();
    },
    show: function() {
        jQuery("#keyboard").animate({ "bottom": "0" }, "slow", function() { });
    },
    hide: function() {
        jQuery("#keyboard").animate({ "bottom": "-350px" }, "slow", function() { });
    },
    defaultKeyboard: {
        dkRhota:[
            { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                
               { value: 4802 },{value: 4804 },{value: 4710  },{value: 4708},{},{value: 4801},{value: 4809 },{value: 4807},{value: 4711},{},{ value: "Menu Key", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToSmallLetter();", keyClass: "dk key_DK" },
            { value: "DK long", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "dk key_DK" },
            { value: "DK hat", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHat();", keyClass: "key key_DK" },
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },{ value: 59 },{},{},{},
                
        //uthopia 2nd row
                { value: 4709 },{ },{ },{ },{ },{ },{ },{ },{},{},{},{},{},
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                {  },{  },{  },{  },{  },{  },{},{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },{ value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
        ],
        
        dkHat:[
            { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                
               {  },{value: 4804 },{ },{ },{ value: 4815},{ },{value: 4810 },{value: 4808},{value: 4803},{},
               { value: "Menu Key", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToSmallLetter();", keyClass: "dk key_DK" },
               { value: "DK rhota", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkRhota();", keyClass: "dk key_DK" },
               { value: "DK long", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "dk key_DK" },
            
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },{ value: 59 },{},{},{},
                
        //uthopia 2nd row
                { value: 4800 },{ },{ },{ },{ value:4824},{ value:4678},{value:4794 },{ },{},{},{},{},{},
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                {  },{ value:4825 },{  },{  },{  },{  },{},{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },{ value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
        ],
        
        dkLoDot:[
            { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                
               { value:4797 },{ },{ },{value: 4822},{ value: 4812},{ },{ },{},{value: 4818},{value:4811},
               { value: "DK long", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "dk key_DK" },
               { value: "DK rhota", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkRhota();", keyClass: "dk key_DK" },
               { value: "DK hat", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHat();", keyClass: "key key_DK" },
            
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },{ value: 59 },{},{},{},
                
        //uthopia 2nd row
                { value: 4817 },{value:4816},{value:4799 },{ value:4814},{ },{ },{},{ },{value:4821},{},{},{},{},
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                {  },{ value:4788 },{value:4813  },{  },{  },{  },{},{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },{ value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }],
        dkHiDot:[
            { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                
               {  },{ },{ },{ },{ },{ },{value: 4793 },{value: 4792},{},{},
               { value: "DK long", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "dk key_DK" },
               { value: "DK rhota", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkRhota();", keyClass: "dk key_DK" },
               { value: "DK hat", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHat();", keyClass: "key key_DK" },
               
            
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },{ value: 59 },{},{},{},
                
        //uthopia 2nd row
                { value: 4791 },{value: 4784 },{value: 4783 },{ },{ value:4787},{ },{ },{ value:4790 },{},{},{},{},{},
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                { value:4785 },{  },{  },{  },{  },{ value:4786 },{},{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },{ value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
            ],
        shift:[
            //1st row
                { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                { value:4705},{value:4707 },{ value:4691},
                { value: 4690 },{value: 4660 },{value: 4704 },{value: 4692},{ value: 4698 },{value: 4706},{ },
                { value: "DK long", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "dk key_DK" },
                { value: "DK rhota", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkRhota();", keyClass: "dk key_DK" },
                { value: "DK hat", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHat();", keyClass: "key key_DK" },
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },{ value: 59 },{},
                { value: "Menu Key", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToSmallLetter();", keyClass: "dk key_DK" },{},
                
        //uthopia 2nd row
                { value: 4703 },{ value: 4669},{value: 4661 },{ },{value: 4673 },{value: 4677 },{ },{ },{ value: 4687 },{},{},
                { value: "DK Hi dot", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHiDot();", keyClass: "dk key_DK" },
               { value: "DK Lo dot", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkLoDot();", keyClass: "dk key_DK" },
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                { value: 4670 },{  },{ vakue:4667 },{  },{  },{ value: 4689 },{value: 4688 },{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },{ value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
            
            ],
        capitalLetter:
            [
                //1st row
                { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                { },{ },{ },
               { value: 4690 },{ },{ },{value: 4702},{ value: 4684 },{value: 4701},{ },{ value: "Menu Key", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToSmallLetter();", keyClass: "dk key_DK" },
            { value: "DK rhota", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkRhota();", keyClass: "dk key_DK" },
            { value: "DK hat", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHat();", keyClass: "key key_DK" },
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },{ value: 59 },{},{},{},
                
        //uthopia 2nd row
                { value: 4699 },{ },{ },{ },{ },{ },{ },{ },{ value: 4687 },{},{},{},{},
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                {  },{  },{  },{  },{  },{ value: 4689 },{value: 4688 },{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },{ value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
        
                // { value: 32, buttonClass: "button button_space" },
                // { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
                // { value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
            ],
        
        //    
        smallLetter: [
        // 1st row
                { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },
                { value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },{value:91},{value:93},{value:92},
                
        //uthopia 1st row
                { value: 4712 },{ value: 4679 },{ value: 4694 },
               { value: 4675 },{ value: 4662 },{ value: 4676 },{},{},{ value: 4696 },{ value: 4655 },
            //   { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
            { value: "DK long", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "dk key_DK" },
            { value: "DK rhota", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkRhota();", keyClass: "dk key_DK" },
            { value: "DK hat", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHat();", keyClass: "key key_DK" },
        // 2nd row
                { value: 97},{ value: 115 },{ value: 100 },{ value: 102 },
                { value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },
                { value: 108 },{ value: 59 },{},{},
                { value: "Shift", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToShift();", keyClass: "key key_DK" },
                // { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
        //uthopia 2nd row
                { value: 4693 },{ value: 4664 },{ value: 4663 },
               { value: 4657 },{ value: 4672 },{ value: 4661 },{value: 4668 },{value: 4680 },{ value: 4674 },{},{},
               { value: "DK Hi dot", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkHiDot();", keyClass: "dk key_DK" },
               { value: "DK Lo dot", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToDkLoDot();", keyClass: "dk key_DK" },
            
        // 3rd row
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },
                { value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 63 },{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
        //uthopia 3rd row
                { value: 4665 },{ value: 4789 },{ value: 4671 },
               { value: 4658 },{ value: 4656 },{ value: 4666 },{value: 4659 },
        
                // { value: 32, buttonClass: "button button_space" },
                { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
                { value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
            ],
        number: [
        // 1st row
                { value: 49 },{ value: 50 },{ value: 51 },{ value: 52 },{ value: 53 },{ value: 54 },
                { value: 55 },{ value: 56 },{ value: 57 },{ value: 48 },
                { value: "Delete", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" },
        // 2nd row
                { value: 45, buttonClass: "button button_dash" },{ value: 47 },{ value: 58 },{ value: 59 },
                { value: 40 },{ value: 41 },{ value: 36 },{ value: 38 },{ value: 64 },
                { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
        //3rd row
                // { value: "ABC", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter()", keyClass: "key key_capitalletterleft" },
                { value: "", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "", keyClass: "key" },
                { value: 63 },{ value: 33 },{ value: 34 },{ value: 124 },{ value: 92 },{ value: 42 },{ value: 61 },{ value: 43 },
                // { value: "ABC", isChar: "false", buttonClass: "button button_capitalletterright", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterright" },
                { value: "", isChar: "false", buttonClass: "button", onclick: "", keyClass: "key" },
                { value: "", isChar: "false", buttonClass: "button", onclick: "", keyClass: "key" },

        // 4th row
                { value: "ABC", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterleft" },
                { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
                { value: "#@+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" }
            ],
        symbols: [
        // 1st row
            { value: 91 },{ value: 93 },{ value: 123 },{ value: 125 },{ value: 35 },{ value: 37 },
            { value: 94 },{ value: 42 },{ value: 43 },{ value: 61 },
            { value: "Delete", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" },
        // 2nd row
            { value: 95, buttonClass: "button button_underscore" },{ value: 92 },{ value: 124 },{ value: 126 },
            { value: 60 },{ value: 62 },
            { value: "&euro;", isChar: "false", onclick: "jsKeyboard.writeSpecial('&euro;');" },
            { value: 163 },{ value: 165 },
            { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
        // 3rd row
            // { value: "ABC", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterleft" },
            { value: "", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "", keyClass: "key" },
            { value: 46 },{ value: 44 },{ value: 63 },{ value: 33 },{ value: 39 },{ value: 34 },{ value: 59 },{ value: 92 },
            // { value: "ABC", isChar: "false", buttonClass: "button button_capitalletterright", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterright" },
            { value: "", isChar: "false", buttonClass: "button", onclick: "", keyClass: "key" },
            { value: "", isChar: "false", buttonClass: "button", onclick: "", keyClass: "key" },
        // 4th row
            { value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
            { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
            { value: "ABC", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterleft" },
         ]
    }
}


// GET CURSOR POSITION
jQuery.fn.getCursorPosition = function(){
    if(this.lengh == 0) return -1;
    return jQuery(this).getSelectionStart();
}

jQuery.fn.getSelectionStart = function(){
    if(this.lengh == 0) return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
        pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if(typeof(input.selectionStart)!="undefined")
    pos = input.selectionStart;

    return pos;
}

//SET CURSOR POSITION
jQuery.fn.setCursorPosition = function(pos) {
  this.each(function(index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return this;
};