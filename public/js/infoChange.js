// Doms

const $displayId = document.querySelector('.display-id');
const $changeCompleteBtn = document.querySelector('.change-complete-btn');
const $changeCompleteBtn2 = document.querySelector('.change-complete-btn2');
const $checkPw = document.querySelector('.check-pw');
const $changePw = document.querySelector('.change-pw');
const $changingPw = document.querySelector('.changing-pw');
const $changedPw = document.querySelector('.changed-pw');
const $changePwInput = document.querySelector('.change-pw-input');
const $changingPwInput = document.querySelector('.changing-pw-input');
const $changedPwInput = document.querySelector('.changed-pw-input');
const $changeBtnWrapper = document.querySelector('.change-btn-wrapper');
const $changeBtnWrapper2 = document.querySelector('.change-btn-wrapper2');
const $myNick = document.querySelector('.my-nick');
const $myNickInput = document.querySelector('.my-nick-input');
const $pwError = document.querySelector('.pw-error');
const $changingPwError = document.querySelector('.changing-pw-error');
const $changedPwError = document.querySelector('.changed-pw-error');
const $changeCancleBtn = document.querySelector('.change-cancel-btn');
const $changeCancleBtn2 = document.querySelector('.change-cancel-btn2');

// 세션 스토리지 user 정보 받아올 변수
const {id: currId, pw:currPw, nickname: currNickName} = JSON.parse(sessionStorage.getItem('user'));


$displayId.textContent = `${currNickName}님`;

$changeCompleteBtn.onclick = () => {
  if ($changePwInput.value !== currPw) {
    $pwError.textContent = '비밀번호가 일치하지 않습니다.'
  }
  if ($changePwInput.value === currPw) {
    $changePw.style.display = 'none';
    $changePwInput.style.display = 'none';
    $pwError.style.display = 'none';
    $changeBtnWrapper.style.display = 'none';
    $changingPw.style.display = 'block';
    $changeBtnWrapper2.style.display = 'block';
    $myNick.style.display = 'block';
    $changedPw.style.display = 'block';
  }
};

$changeCompleteBtn2.onclick = () => {
  const pwReg = /^[A-Za-z0-9+]{8,12}$/;
  $changingPwError.textContent = '';
  $changedPwError.textContent = '';

  if (!$changingPwInput.value) {
    $changingPwError.textContent = '필수 입력 항목입니다.';
    return;
  }
  if (!pwReg.test($changingPwInput.value)) {
    $changingPwError.textContent = '8~12자의 영문자, 숫자만 사용가능합니다.'
    return;
  }
  if ($changingPwInput.value !== $changedPwInput.value || !$changedPwInput.value) {
    $changedPwError.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }
  
  if ($changingPwInput.value === $changedPwInput.value && !$myNickInput.value) {
    const changeUserPw = { id: currId, pw: $changedPwInput.value, nickname: currNickName }
    sessionStorage.setItem('user', JSON.stringify(changeUserPw));
    window.location.assign('my-page.html');
  }

  if ($changingPwInput.value === $changedPwInput.value && $myNickInput.value) {
    const changeUserInfo = { id: currId, pw: $changedPwInput.value, nickname: $myNickInput.value }
    sessionStorage.setItem('user', JSON.stringify(changeUserInfo));
    window.location.assign('my-page.html');

    const request = {
      patch(url, payload) {
        return fetch(url, {
          mothod: 'PATCH',
          headers: { 'content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    }

    request.patch(`/users/${sessionStorage.getItem('user.id')}`, {
      pw: `${currPw}`
    }).then(response => response.json())
      .then(users => console.log(users))
      .catch(err => console.error(err));  
  }
}

$changeCancleBtn.onclick = () => {
  window.location.assign('my-page.html');
}

$changeCancleBtn2.onclick = () => {
  window.location.assign('my-page.html');
}
