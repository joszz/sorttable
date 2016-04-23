/*
 * sorttable.js
 *
 * Requires: jQuery (tested with v 1.11)
 *
 * jQuery plug-in that allows you to sort table by any column
*/

jQuery.fn.addSortWidget = function(options){
	var defaults = {
		img_asc: "img\\asc_sort.gif",	
        img_desc: "img\\desc_sort.gif",	
		img_nosort: "img\\no_sort.gif",		
	};
	
	var options = $.extend({}, defaults, options),
		$destElement = $(this),
        is_asc = true;
		
	$("th", $destElement).each(function(index){
        $("<img>")
            .attr('src', options.img_nosort)
            .addClass('sorttable_img')
            .css({
                cursor: 'pointer',
                'margin-left': '10px',
            })
            .on('click', function(){
                $(".sorttable_img", $destElement).attr('src', options.img_nosort);
                $(this).attr('src', (is_asc) ? options.img_desc : options.img_asc);
                is_asc = !is_asc;
                
                var rows = $("tr", $destElement).not(":has(th)").get();
                rows.sort(function(a, b){
                    var m = $("td:eq(" + index + ")", a).text();
                    var n = $("td:eq(" + index + ")", b).text();
                    if (is_asc)
                        return m.localeCompare(n);
                    else
                        return n.localeCompare(m);
                });
                
                var tbody = ($destElement.has("tbody")) ? "tbody" : "";
                for (var i=0; i<rows.length; i++){
                    $(tbody, $destElement).append(rows[i]);
                }
            })
            .appendTo(this);
    });
	
	return $destElement;

}
