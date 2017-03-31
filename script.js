$(document).ready(function() {
     
  
  /*
   * Open a random article on click
   */

  $('.rand').click(function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');

  });

  /*
   * Ajax call on search click
   */

  $('#search').on('click', function() {
    
    if($('#search-term').val() === ''){
     
       $('#default').show();
      console.log('empty');

    }
    
    /*
    * Clear out previous search results
    */

    $('ul.resultlist').empty();
        
    /*
    * Set search term to input value
    */

    var searchTerm = $('#search-term').val();

    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?';

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      async: false,
      success: function(data) {
        
        /*
        * Iterate through results and put into ul
        */

        for (var i = 0; i < data[1].length; i++) {

          $('#results').append('<li><b><p>' + data[1][i] + '</p></b><p>' + data[2][i] + '<br /><a href="' + data[3][i] + '" target="_blank">' + data[3][i] + '</a></p></li>');

        }

        /*
         * Turn whole li into link
         */

        $('ul.resultlist > li').click(function() {
          window.open($(this).find("a").attr("href"));
          return false;

        });  
        
        
    if(!$.trim($('ul.resultlist').html())=='') {
          $('#default').hide();
        }
        
      }
    });
    

  });
  
  /*
  * Set search value on 'enter' keypress
  */

  $('.searchbar').keypress(function(e) {
    if (e.which == 13) {
      $('#search').click();
      return false;
    }
  });
  
  
});
