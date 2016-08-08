'use strict';

var fs = require( 'fs' );
var fsex = require('fs-extra');
/*
   if (process.argv.length < 3) {
   console.error('lack argument.');
   process.exit(1);
   }
*/

//ここに画像があるパスと結果を出力するパスを入れる
var defaultPath = "./default_a/";
var outputPath = "./output/";

var main = function() {
    
    //default_aのファイルから読み込み。
    fs.readdir( defaultPath, function( err, files ) {
       
       //エラー出たら処理を終了
       if (err) {
            console.error( "[readFileSync error: ]" );
            console.error( err );
            process.exit(1);
        }
        //ファイル一欄を入れておくやつ
        var fileList = [];

        //ファイルの個数分だけ処理を回す。
        for (var i = 0; i < files.length; i++) {
            console.log( files[i] );
        
            var dirname = getDirName( files[i] );
            
            //フォルダを作るのは同期的に実行しておく（existしないと困るので)
            fs.mkdir( outputPath + dirname, function( err ) {
            
                if( err ) {
                    //return; //既に存在していたらスキップ
                }

                // directory create success
            } );

/*
            //ファイルを移動する
            //default_a/hoge111.jpg -> hoge/hoge111.png
            fs.rename( defaultPath  + files[i] , "./" + dirname + "/", function( err ){
                if( err ) {
                    console.log( "ERROR: cannnot file moved. file name is ... " + files[i] );
                    console.log( err )
                }
                //success
            } );
*/

        /*
            fsex ex)
            fs.move('/tmp/somefile', '/tmp/does/not/exist/yet/somefile', function (err) {
                if (err) return console.error(err)
                console.log("success!")
            })
        */
            fsex.rename( defaultPath  + files[i] , outputPath + dirname + "/" + files[i], function( err ){
            
                if( err ) return console.log( err );
                //no err is success;
            } );

        }
    
    } );
    

};

/* 
 * file名からDirectory名を取得。
 * 命名規則はXXXXnnnnn.jpg|pngなのでXXXXだけ切り抜く
 * input:hoge1111
 * output: hoge
 */
var getDirName = function( filename ) {

    //だいぶ雑なのであとで直したい
    
    //拡張子を削除してfileの名前のみにする
    //ex) hoge1111.jpg -> hoge1111
    var basename = filename.substr(0, filename.indexOf(".") );
    //basenameの中で数値以外の文字列だけを抜き出し、配列を文字列に変換
    //ex) hoge -> ["h","o","g","e"] -> hoge
    var dirname = basename.match(/[a-zA-Z]/g).join("");

    //dirにする名前を返す
    //ex) hoge
    return dirname;
};


main();
//module.export = main;
