document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

if (location.href.includes('?code')) {
  for (let i = 0; i <= 1; i++) {
    location.replace('/');
  }
}
