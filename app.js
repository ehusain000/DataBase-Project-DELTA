var mysql = require('mysql');   
var express = require('express');
var exphbs  = require('express-handlebars');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'deltamusic',
  multipleStatements: true
});

app.set('view engine', 'handlebars');
app.engine( 'handlebars', exphbs( {
    extname: 'handlebars',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
  }));

app.use(express.urlencoded());
app.use(express.static(__dirname));

connection.connect(function(err) {
    if (err) throw err
}); 

const query_playlist_select = 'SELECT * FROM Playlists ORDER BY playlistID';

app.get('/library', function (req, res, next) {
    connection.query(query_playlist_select, function(err, rows, fields) {
    if (!err){
    
        var data = {
          layout: 'main',
          template: 'library-template',
          rows
        };
        res.render('library', data);
    }else
        console.log('Error while performing Query.', err);
    });
});

    /////////////////////////////////////////////////////////////////////////////////////


    const query_playlist_insert = 'INSERT INTO Playlists (libraryID, name) VALUES (?, ?);';

    app.post('/library/create_playlist', (req, res) => {
      
      const libraryID = 1;
      const name = req.body.playlist_name;    
      
      connection.query(query_playlist_insert, [libraryID, name], (error, results, fields) => {
          if (error) {
              throw error;
          }
          console.log("Playlist : '" + name + "' Inserted successfully.");
          res.redirect('/library')
      });
    });

    app.post('/library/delete_playlist', (req, res) => {
      
      const playlist = req.body.playlist;

      connection.query('DELETE FROM Playlists WHERE ? = playlistID;', [playlist], (error, results, fields) => {
          if (error) {
              throw error;
          }
          console.log('PlaylistID : ' + playlist + ' Deleted successfully !');
          res.redirect('/library')
      });
    });

    app.post('/library/delete_playlist_range', (req, res) => {

        const start = req.body.start;
        const finish = req.body.finish;
        connection.query('DELETE FROM Playlists WHERE ? <= playlistID AND playlistID <= ?;', [start, finish], (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log('PlaylistID Start: ' + start);
            console.log('PlaylistID Finish: ' + finish);
            console.log('Delete Completed !! or not');
            res.redirect('/library')
        });
    });

    ///////////////////////////////// Playlist ////////////////////////////////////////////////
    
    app.get('/playlist', function (req, res, next) {
        connection.query('SELECT * FROM Tracks', function(err, rows, fields) {
        if (!err){
            
            var data = {
              layout: 'main',
              template: 'playlist-template',
              rows
            };
            res.render('playlist', data);
            console.log(rows);
        }else
            console.log('Error while performing Query1.', err);
        });
    });

    app.get('/index', function (req, res, next) {
        connection.query('SELECT name FROM Tracks; SELECT playlistID FROM Playlists; SELECT artistID FROM Artists;', 
            function(err, rows, fields){
            if(err){
                throw err;
            }else{
                //console.log(rows[0]);       // Column1 as a result
                //console.log(rows[1]);       // Column2 as a result
                //console.log(rows[2]);       // Column3 as a result
                var trackList = [];
                var playList = [];
                var artistList = [];
    
                    rows[0].forEach(function(row) {
                        trackList.push({
                            name  : [row.name]
                        });
                    });
                    rows[1].forEach(function(row) {
                        playList.push({
                            playlistID  : [row.playlistID]
                        });
                    });
                    rows[2].forEach(function(row) {
                        artistList.push({
                            artistID  : [row.artistID]
                        });
                    });
                    
                var data = {
                    layout: 'main',
                    template: 'index-template',
                    rows,
                    trackList,
                    playList,
                    artistList
                };
                res.render('index', data);
            }
        });
    });

    /////////////////////////////// User ////////////////////////////////

    const query_users_insert = 'INSERT INTO Users (username, password, email, firstName, lastName) VALUES (?, ?, ?, ?, ?);';
    const query_users_select = 'SELECT * FROM Users ORDER BY userID';

    app.post('/create', (req, res) => {
        const Username = req.body.Username;
        const Password = req.body.Password;
        const Email = req.body.Email;
        const Firstname = req.body.Firstname;
        const Lastname = req.body.Lastname;
    
        connection.query(query_users_insert, [Username, Password, Email, Firstname, Lastname], (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log("User Inserted successfully.");

            res.redirect('/index')
        });
    });

    app.get('/account', function (req, res, next) {
        connection.query(query_users_select, function(err, rows, fields) {
        if (!err){
        
            var data = {
            layout: 'main',
            template: 'account-template',
            rows
            };
            res.render('account', data);
        }else
            console.log('Error while performing Query.', err);
        });
    });

    app.post('/account/delete_playlist', (req, res) => {
      
        const username = req.body.name; // name gets userID

        connection.query('DELETE FROM Users WHERE ? = username;', [username], (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log('UserID : ' + userId + 'Username : ' + username + ' Deleted successfully !');
            res.redirect('/account')
        });
      });


app.listen(3000);