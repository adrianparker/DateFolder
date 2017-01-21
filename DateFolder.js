"use strict";

var fs = require('fs');

var existingFolders = [],
    toCreate = {};

// TODO: take root folder from command line param
// TODO: compare performance of fs.stat to fs.lstat

function DateFolder() {
    console.log('Welcome to DateFolder. Processing %s', __dirname);
    fs.readdir(__dirname, processDirectoryContent);
}

function processDirectoryContent(err, files) {
    if (err) throw err;
    if (files && files.length > 0) {
        files.forEach(function (entry) {
            processDirectoryEntry(entry);
        });
        for (var toCreateFolder in toCreate){
            if(toCreate.hasOwnProperty(toCreateFolder)){
                console.log('Will create folder %s with file count %s', toCreateFolder, toCreate[toCreateFolder].length);
                // if existingFolders contains toCreateFolder... ? use it or error?
            }
        }
    } else {
        console.log('No files available to process');
        process.exit(0);
    }
}

function processDirectoryEntry(entry) {
    var lstat = fs.lstatSync(entry);// TODO investigate using lstat asynchronously here
    if (lstat.isDirectory()) {
        existingFolders.push(entry);
    } else if (lstat.isFile()) {
        var birthtime = convertToYYYYMMDD(lstat.birthtime);
        if (toCreate.hasOwnProperty(birthtime)) {
            toCreate[birthtime].push(entry);
        } else {
            toCreate[birthtime] = [entry];
        }
    } else {
        console.warn('%s is neither file nor directory, ignoring', entry);
    }
}

function convertToYYYYMMDD(birthtime) {
    var mm = birthtime.getMonth() + 1;
    var dd = birthtime.getDate();
    return [birthtime.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
}

DateFolder();