// setup our hash support
$(function () {
	
	// used to keep track of the current known internal location
	var loc;
	
	$(window).hashchange(function () {
		
		var hash = location.hash,
			parts,
			query;
		
		// if there isn't a hash then we redirect to home
		if (!location.hash) return location.hash = '#/home';
		
		// remove the first characters
		hash = hash.replace(/^#\//, '');
		
		// try and pull out any query we have
		if (hash.indexOf(':') > -1) {
			parts = hash.split(':');
			hash = parts.shift();
			query = parts.shift();
		}
		
		if (hash != loc) {
			loc = hash;
			
			// attempt to load the file directly since the paths should match 1:1 for html partials
			// generated by the template
			$('#content').load(hash + '.html', function (res, status) {
				if (status == 'error') {
					$('#content').html('Could not locate the requested file: ' + hash);
				}
				if (query) setTimeout(function () { find(query) }, 300);
			});
		}
		if (query) find(query);
	});
	
});

// setup our link finding mechanism - try and find an anchor by this (unique) name much like a
// normal hashchange might
function find (anchor) {
	if (!anchor) return;
	
	// if the anchor is passed in prefixed with a ':' then we actually need to make a hash-request
	// change for it so that it is detected in history
	if (anchor[0] == ':') {
		if (location.hash.indexOf(anchor) === -1) {
			location.hash = (location.hash.replace(/:(.*)$/, '') + anchor);
			return;
		} else anchor = anchor.slice(1);
	}
	
	var el = $('a[name="' + anchor + '"]');
	
	// if it found the element (should have length 1 or we'll assume we were looking for the
	// first matching element) we want to scroll to it
	if (el.length) $('html, body').animate({
		scrollTop: el.offset().top
	}, 500);
}

$(document).ready(function () {

	// ensure that we actually have a hash
	$(window).hashchange();

});