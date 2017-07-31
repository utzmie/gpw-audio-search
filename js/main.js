function katakanaToHiragana(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}


function hiraganaToKatagana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}


/**
 * 絞り込み
 */

var app = new Vue({

	el: '#app',

	data: {
		searchQuery: '',
		items: audioList
	},

	computed: {
		filteredItems: function() {
			var _this = this;
			return this.items.filter(function (item) {
				return item.name.toLowerCase().indexOf(_this.searchQuery.toLowerCase()) > -1 || 
					hiraganaToKatagana(item.name).indexOf(hiraganaToKatagana(_this.searchQuery)) > -1 || 
					katakanaToHiragana(item.name).indexOf(katakanaToHiragana(_this.searchQuery)) > -1 ;
			});
		}
	},

	methods: {
		play: function(event) {
			var audio = new Audio( event.target.dataset.src );
			audio.play();
		}
	}
});
