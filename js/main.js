/* ============================================================
   D121 — Scripts du site
   ============================================================ */
(function () {
  'use strict';

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---- Année dans le footer ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Carte zone d'intervention (Leaflet, page Contact) ---- */
  var mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    var brest = [48.3904, -4.4861];
    var map = L.map('map', { scrollWheelZoom: false }).setView([48.405, -4.47], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    // Zone d'intervention (couvre Brest + communes voisines)
    L.circle(brest, {
      radius: 12000, color: '#cb4a2a', weight: 2,
      fillColor: '#cb4a2a', fillOpacity: 0.10
    }).addTo(map);
    // Communes desservies
    var communes = [
      ['Brest', 48.3904, -4.4861], ['Bohars', 48.4147, -4.5386],
      ['Guilers', 48.4256, -4.5647], ['Gouesnou', 48.4494, -4.4675],
      ['Guipavas', 48.4342, -4.3969], ['Plouzané', 48.3789, -4.6197],
      ['Le Relecq-Kerhuon', 48.3931, -4.3961], ['Plougastel-Daoulas', 48.3711, -4.3714]
    ];
    communes.forEach(function (c) {
      var main = c[0] === 'Brest';
      L.circleMarker([c[1], c[2]], {
        radius: main ? 9 : 6, color: '#fff', weight: main ? 3 : 2,
        fillColor: main ? '#cb4a2a' : '#213a5c', fillOpacity: 1
      }).addTo(map)
        .bindTooltip(c[0], { direction: 'top', offset: [0, -6] })
        .bindPopup(main
          ? '<b>D121 — Revêtements de sol</b><br>Basés à Brest · zone d\'intervention'
          : '<b>' + c[0] + '</b><br>Commune desservie');
    });
    // Zoom molette seulement quand la carte a le focus (n'entrave pas le défilement)
    map.on('focus', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });
  }

  /* ---- Galerie lightbox (page Réalisations) ---- */
  var gallery = document.getElementById('gallery');
  var lb = document.getElementById('lightbox');
  if (gallery && lb) {
    var figs = Array.prototype.slice.call(gallery.querySelectorAll('figure'));
    var lbImg = document.getElementById('lb-img');
    var lbCap = document.getElementById('lb-cap');
    var current = 0;

    function openAt(i) {
      current = (i + figs.length) % figs.length;
      var fig = figs[current];
      var img = fig.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = fig.getAttribute('data-cap') || img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

    figs.forEach(function (fig, i) {
      fig.addEventListener('click', function () { openAt(i); });
    });
    document.getElementById('lb-close').addEventListener('click', close);
    document.getElementById('lb-prev').addEventListener('click', function (e) { e.stopPropagation(); openAt(current - 1); });
    document.getElementById('lb-next').addEventListener('click', function (e) { e.stopPropagation(); openAt(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') openAt(current - 1);
      else if (e.key === 'ArrowRight') openAt(current + 1);
    });
  }

  /* ---- Apparition au scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ============================================================
     Formulaire de contact — envoi via Web3Forms (vers contact@d121.fr)
     ============================================================ */
  var WEB3FORMS_KEY = 'c6ed545d-b2fa-4aaa-8b96-2e3c68570ea1';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var feedback = document.getElementById('form-feedback');
  var submitBtn = form.querySelector('[type="submit"]');

  function show(type, msg) {
    if (!feedback) return;
    feedback.className = 'form-feedback ' + type;
    feedback.textContent = msg;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validation (le formulaire est en novalidate)
    var required = ['name', 'phone', 'subject', 'message'];
    for (var i = 0; i < required.length; i++) {
      var f = form[required[i]];
      if (!f || !f.value.trim()) {
        show('err', 'Merci de renseigner tous les champs obligatoires (*).');
        f && f.focus();
        return;
      }
    }
    if (!form.consent || !form.consent.checked) {
      show('err', 'Merci de cocher la case de consentement pour envoyer votre demande.');
      form.consent && form.consent.focus();
      return;
    }

    // Clé non configurée : on bascule sur un email pré-rempli (solution de secours)
    if (WEB3FORMS_KEY === 'VOTRE_CLE_WEB3FORMS') {
      var nom = encodeURIComponent(form.name.value || '');
      var tel = encodeURIComponent(form.phone.value || '');
      var sujet = encodeURIComponent('Demande de devis - ' + (form.subject.value || 'D121'));
      var corps = encodeURIComponent(
        'Nom : ' + form.name.value + '\n' +
        'Téléphone : ' + form.phone.value + '\n' +
        'Email : ' + form.email.value + '\n' +
        'Prestation : ' + form.subject.value + '\n\n' +
        'Message :\n' + form.message.value
      );
      window.location.href = 'mailto:contact@d121.fr?subject=' + sujet + '&body=' + corps;
      show('ok', 'Votre logiciel de messagerie va s’ouvrir avec votre demande pré-remplie. Il ne reste qu’à cliquer sur « Envoyer ».');
      return;
    }

    var data = new FormData(form);
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', 'Nouvelle demande D121 — ' + (form.subject.value || 'Contact'));
    data.append('from_name', 'Site D121 Revêtements');

    var original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.success) {
          form.reset();
          show('ok', 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.');
        } else {
          show('err', 'Une erreur est survenue. Vous pouvez nous appeler ou nous envoyer un SMS au 07 66 19 53 11.');
        }
      })
      .catch(function () {
        show('err', 'Connexion impossible. Vous pouvez nous appeler ou nous envoyer un SMS au 07 66 19 53 11.');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      });
  });
})();
