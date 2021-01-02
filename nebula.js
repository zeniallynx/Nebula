var fs = require('fs');
const { url } = require('inspector');
const md5File = require('md5-file');
var path = require("path");

function makePackage() {

    //Read Base
    let rawdata = fs.readFileSync(path.join(__dirname, "config", "base.json"));
    var base = JSON.parse(rawdata);


    var mods_dir = path.join(__dirname,'modpack')
    fs.readdir(mods_dir, (err, files) => {
        for(let i = 0; i < files.length; i++) {
            console.log(files[i]);
            var base_url = "http://cdn.thelynxcompany.ga/launcher/mods/" + files[i];
            var base_filename = files[i];
            var base_md5 = md5File.sync(path.join(mods_dir,files[i])).toString();

            var base_mod = {
                "url": base_url,
                "filename": base_filename,
                "md5": base_md5
            }

            console.log(base_mod);
            base.mods.push(base_mod);
            console.log("===========================================");

            if(i == files.length - 1) {
                fs.writeFile(path.join(__dirname,"out",'package.json'), JSON.stringify(base), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
            }
        }
        
    });
}

makePackage();