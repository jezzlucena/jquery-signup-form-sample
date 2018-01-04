$(document).ready(() => {
  $('body').attr('data-screen', 'userInfo');

  $('input').keyup(function() {
    if ($(this).val() && $(this).val().length > 0) {
      $(this).siblings('.SignupForm-label').addClass('show')
    }
  })

  $('input').keydown(function() {
    $('.SignupForm-alert').removeClass('show')
  })

  $('#nextButton').click(function() {
    if ($('#password').val() !== $('#confirmPassword').val()) {
      $('.SignupForm-alert--passwords').addClass('show')
      return false
    }

    $('.SignupForm-formActions').addClass('loading')

    requestNext(result => {
      $('.SignupForm-formActions').removeClass('loading')

      // TODO: Implement real database connection
      if ($('#email').val().includes('exists')) {
        $('.SignupForm-alert--emailExists').addClass('show')
        return;
      }

      $('body').attr('data-screen', 'address');
    })

    return false
  })

  $('#backButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
  })

  $('form').submit(function() {
    $('.SignupForm-formActions').addClass('loading')

    requestSignup(result => {
      $('.SignupForm-formActions').removeClass('loading')

      // Handling pre-formatted errors from the server
      if (result.error) {
        $('.SignupForm-alert--serverError').text(result.error)
        $('.SignupForm-alert--serverError').addClass('show')
        return;
      }

      window.location.href = 'success.html'
    })

    return false
  })
})

function requestNext(callback) {
  setTimeout(() => callback({ error: false }), 2000)
}

function requestSignup(callback) {
  setTimeout(() => callback({ error: "This address is invalid" }), 2000)
}
