var jMatch = {};

jMatch.fnCreateMatch = function(oPlayer, oOponent) {
	var jNewMatch = {
		"player": oPlayer,
		"oponent": oOponent,
		"wins" : {
			"player": 0,
			"oponent": 0
			}
	};

	return jNewMatch;
}

module.exports = jMatch;