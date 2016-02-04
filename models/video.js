exports.Video = function(videoId, votes, thumbnailUrl){
  this.video_id= videoId;
  this.votes= votes || 1;
  this.thumbnailUrl = thumbnailUrl;
}
