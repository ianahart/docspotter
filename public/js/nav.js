import M from 'materialize-css';

document.addEventListener('DOMContentLoaded', function () {
  console.log(M);

  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

if (location.href.includes('?code')) {
  for (let i = 0; i <= 1; i++) {
    location.replace('/');
  }
}
