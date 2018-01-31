app.controller('discoverCtrl',['$scope', '$rootScope','authService','$timeout','$location','$http','CONSTANT',
'homePageService','toastr',
function ($scope, $rootScope, authService, $timeout, $location, $http, CONSTANT, homePageService,toastr ) {
   
   $scope.postList = [];
   $scope.showSlider = false;
   $scope.responsive_slider = [1,2,3]
   $scope.getPostbasedonCategory = function(category){
    homePageService.getFilteredPosts({ "category":category })
    .then(function(response){
        if(response.data.success){
            if(response.data.data.length >0){
               $scope.postList = response.data.data;
              
            }else{
                toastr.error("No posts found");
            }
        }
    })
   }
    
   $scope.goBack = function(){
    $scope.postList = [];
   }

   



   $timeout(function(){
    showList();
    $scope.showSlider = true;
    getFavouritePosts();
    },1500)

   var getFavouritePosts = function(){
    homePageService.getFavouritePosts($rootScope.current_user.favourites)
    .then(function(response){
        if(response.data.success){
            if(response.data.data.length >0){
                $scope.showSlider = true;
              
            }else{
                toastr.error("No posts found");
            }
        }
    })
   }

   var showList = function() {
    window.prettyPrint && prettyPrint();
    $('.windowWidh').text($(window).width());
    var slider = [];
    for(var i=0;i<$scope.responsive_slider.length; i++){
        slider[i] = $('#responsive_'+$scope.responsive_slider[i]).lightSlider({
            item:3,
            slideMove:2,
            loop:false,
            cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed:600,
            slideEndAnimation:true,
            controls:false,
            pager:false,
            prevHtml : '<span class="custom-prev-html"><img src="../images/left.png" /></span>',
            nextHtml : '<span class="custom-next-html"><img src="../images/right.png" /></span>',
            responsive : [
              {
                  breakpoint:1024,
                  settings: {
                    item:3,
                    slideMove:1,
                    slideMargin:6,
                    }
                },
              {
                breakpoint:800,
                settings: {
                  item:3,
                  slideMove:1,
                  slideMargin:6,
                  }
              },
              {
                breakpoint:480,
                settings: {
                  item:2,
                  slideMove:1
                  }
              }
            ],
              
            onSliderLoad: function() {
              $('#responsive_'+$scope.responsive_slider[i]).removeClass('cS-hidden');
            } 
          });
    }
      
        $scope.goToPrevSlide = function(count){
            slider[count].goToPrevSlide(); 
        };

        $scope.goToNextSlide = function(count){
            slider[count].goToNextSlide(); 
        };
      
    };
}]) 
