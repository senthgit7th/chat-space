$(function(){ 
  last_message_id = $('.message:last').data("message-id");
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
  var reloadMessages = function() {
    var last_message_id = $(".main-chat__main-view:last").data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});