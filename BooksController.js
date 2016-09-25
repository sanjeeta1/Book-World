(function(){

   angular.module('app').controller('BooksController',['books','dataService','badgeService','$cookies','$cookieStore','$log','$route',BooksController]);

    function BooksController($q,books,dataService,badgeService,$cookies,$cookieStore,$log,$route)
    {
        var vm = this;
        vm.appName = books.appName;
        dataService.getAllBooks().then(getBooksSuccess, null, getBooksNotification)
        .catch(errorCallback).finally(getAllBooksComplete);
        function getBooksSuccess(books)
        {
        vm.allBooks = books;
        }
        function errorCallback(message)
        {
        console.log('Error Message: '+message);
        }
        function getBooksNotification(notification)
        {
        console.log('Promise Notification: '+notification);
        }
        
        function getAllBooksComplete()
        {
        console.log('getAllBooks has completed');
        }
        dataService.getAllReaders().then(getReadersSuccess).catch(errorCallback).finally(getAllReadersComplete);
        
        function getReadersSuccess(readers)
        {
        vm.allReaders = readers;
        }
        function getAllReadersComplete(){
        
        }
       vm.deleteBook = function(bookID)
       {
          dataService.deleteBook(bookID).then(deleteBookSuccess).catch(deleteBookError);
       };
       function deleteBookSuccess(message)
       {
          $log.info(message);
          $route.reload();
       }
        function deleteBookError(errmessage)
       {
          $log.error(errmessage);
       }
        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEdited = $cookieStore.get('lastEdited');
        $log.log('logging with log');
        $log.info('logging with info');
        $log.warn('logging with warn');
        $log.error('logging with error');
        $log.debug('logging with debug');
        }
    }());
