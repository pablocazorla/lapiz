for (var a in lapiz) {
	if (typeof lapiz[a] == 'object' && lapiz[a] !== null) {
		lapiz[a].and = function() {
			return lapiz;
		}
	}
}
lapiz.and = function() {
	return lapiz;
}


return lapiz;
}
})();