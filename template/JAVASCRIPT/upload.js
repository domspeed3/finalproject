"use strict"

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('uploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        var files = document.getElementById('fileUpload').files;
        var preview = document.getElementById('preview');
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            // Stellen Sie sicher, dass es sich um ein Foto oder Video handelt
            if (file.type.match('image.*') || file.type.match('video.*')) {
                var reader = new FileReader();
                
                reader.onload = (function(file) {
                    return function(e) { 
                        // Erzeugen Sie einen neuen div für jede Datei
                        var div = document.createElement('div');
                        div.innerHTML = ['<img class="previewImage" src="', e.target.result,
                                        '" title="', escape(file.name), '"/>'].join('');
                        preview.insertBefore(div, null);
                    };
                })(file);
                
                // Dateien als Data URL lesen
                reader.readAsDataURL(file);
            } else {
                alert("Falsches Dateiformat. Bitte laden Sie ein Foto oder Video hoch.");
            }
        }
    });
    
});
