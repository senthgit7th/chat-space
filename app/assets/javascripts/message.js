$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__main-view" data-message-id=${message.id}>
        <div class="main-chat__main-view__message">
          <div class="main-chat__main-view__message__upper-info">
            <div class="main-chat__main-view__message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="main-chat__main-view__message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
        <div class="main-chat__main-view__message__text">
          <div class="lower-message__content">
            ${message.content}
          </div>
        </div>
          <img src=${message.image}>
        </div>
      </div>`
     return html;
   } else {
     var html =
      `<div class="main-chat__main-view" data-message-id=${message.id}>
        <div class="main-chat__main-view__message">
          <div class="main-chat__main-view__message__upper-info">
            <div class="main-chat__main-view__message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="main-chat__main-view__message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__main-view__message__text">
            <div class="lower-message__content">
              ${message.content}
            </div>
          </div>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .always(function(){
    $(".submit-btn").prop("disabled", false);
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('form')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
  })
  .fail(function() {
    alert('メッセージ送信に失敗しました');
  });
})
});