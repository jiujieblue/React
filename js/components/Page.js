require('../../less/page.less');


var React = require('react');

var Page = React.createClass({

	render: function () {
		$(document).ready(function(){
			var video = document.getElementById("video");
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext("2d")
			var errocb = function() {
				console.log('sth wrong!');
			}
			if (navigator.getUserMedia) { // 标准的API
                navigator.getUserMedia({ "video": true }, function (stream) {
                    video.src = stream;
                    video.play();
                }, errocb);
			} 
			else if (navigator.webkitGetUserMedia) { // WebKit 核心的API
                navigator.webkitGetUserMedia({ "video": true }, function (stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errocb);
 			}
 			document.getElementById("picture").addEventListener("click", function () {
                context.drawImage(video, 0, 0, 640, 480);
 });
		})
		
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="page">
						<video id="video" autoPlay="" width='640' height='480'></video>
						<button id='picture'>PICTURE</button> 
						<canvas id="canvas" width="640" height="480"></canvas>
					</div>
				</div>
			</div>
			);
	},
	
});

module.exports = Page;