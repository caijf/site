<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Aniamtion UI Library</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" href="assets/bootstrap.min.css" media="screen" title="no title" charset="utf-8">
  <link rel="stylesheet" href="assets/dashboard.css" media="screen" charset="utf-8">
  <link rel="icon" href="../favicon.png" type="image/x-icon" />
</head>

<body>
  <header class="navbar navbar-inverse navbar-fixed-top" role="banner">
    <div class="container-fluid">
      <div class="navbar-header">
        <span class="navbar-brand">Animation UI Library</span>
      </div>
    </div>
  </header>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
          <?php $directory='./';
                $scaned_directory=array_diff(scandir($directory), array( '..', '.', '.DS_Store', 'index.php', 'api.php', 'jquery', 'assets'));
                $prototypes=array();
                for ($i=0; $i<count($scaned_directory); $i++){
                    $prototypes[]=array($scaned_directory[$i],i);
                }
                for ($i=0;$i<count($prototypes);$i++){
                  if ($prototypes[$i][0] !='' ) {
                    echo '<li><a href="'.$prototypes[$i][0]. '/" target="_blank">'.$prototypes[$i][0]. '</a></li>';
                  }
                }
          ?>
        </ul>
      </div>
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <iframe src="./AnimatedCheckboxes/index.html" id="detailview" width="100%" height="700"></iframe>
      </div>
    </div>
  </div>
  <script src="assets/jquery-1.11.1.min.js" charset="utf-8"></script>
  <script src="assets/bootstrap.min.js" charset="utf-8"></script>
  <script charset="utf-8">
    $(document).ready(function(){
      var scrollHeight = $(window).height();
      $('#detailview').attr('height',scrollHeight-50);
      $('.nav-sidebar li:first-child').addClass('active');

      $('.nav-sidebar a').each(function(index){
        $(this).click(function(e){
          e.preventDefault();
          $('.nav-sidebar .active').removeClass('active');
          $(this).parent().addClass('active');
          $('#detailview').attr('src',$(this).attr('href')+'index.html');
        })
      })
    })
  </script>
</body>

</html>
