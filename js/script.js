// ===== SCRIPT PRINCIPAL - ESPACE MAMPIHANTA =====

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GESTION DU BOUTON MESSENGER =====
    const messengerBtn = document.querySelector('.btn');
    if (messengerBtn) {
        messengerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Rediriger vers Messenger avec l'ID de la page
            window.open('https://m.me/61578187742187', '_blank');
        });
    }

    // ===== NAVIGATION SMOOTH SCROLL =====
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculer la position (en tenant compte de la navbar fixe)
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans recharger
                history.pushState(null, null, targetId);
            }
        });
    });

    // ===== EFFET DE SURVOL AMÉLIORÉ POUR LES CARTES =====
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== ANIMATION AU SCROLL =====
    const sections = document.querySelectorAll('.section');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Options pour l'Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Créer un observer pour les sections
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Appliquer l'observer à chaque section
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // ===== GESTION DU MENU ACTIF =====
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + document.querySelector('nav').offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Enlever la classe active de tous les liens
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Ajouter la classe active au lien correspondant
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Ajouter un style pour le lien actif
    const style = document.createElement('style');
    style.textContent = `
        nav ul li a.active {
            color: #667eea;
        }
        nav ul li a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Écouter le scroll pour mettre à jour le lien actif
    window.addEventListener('scroll', updateActiveNavLink);

    // ===== GESTION DE LA GALERIE (LIGHTBOX SIMPLE) =====
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Récupérer l'image ou le contenu
            const img = this.querySelector('img');
            if (img) {
                // Créer une modale simple
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
                modal.style.zIndex = '2000';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.cursor = 'pointer';
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.style.maxWidth = '90%';
                modalImg.style.maxHeight = '90%';
                modalImg.style.objectFit = 'contain';
                modalImg.style.borderRadius = '8px';
                
                modal.appendChild(modalImg);
                
                // Fermer la modale au clic
                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                document.body.appendChild(modal);
            }
        });
    });

    // ===== FORMULAIRE DE CONTACT (À DÉVELOPPER PLUS TARD) =====
    // Préparer un conteneur pour un futur formulaire
    console.log('Site Espace Mampihanta chargé avec succès !');

    // ===== DÉTECTION DE LA CONNEXION INTERNET =====
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            // Afficher un message si hors ligne
            const offlineMsg = document.createElement('div');
            offlineMsg.style.position = 'fixed';
            offlineMsg.style.bottom = '20px';
            offlineMsg.style.left = '20px';
            offlineMsg.style.backgroundColor = '#f44336';
            offlineMsg.style.color = 'white';
            offlineMsg.style.padding = '10px 20px';
            offlineMsg.style.borderRadius = '5px';
            offlineMsg.style.zIndex = '1001';
            offlineMsg.textContent = 'Mode hors ligne - Certaines fonctionnalités peuvent être limitées';
            document.body.appendChild(offlineMsg);
            
            setTimeout(() => {
                if (offlineMsg.parentNode) {
                    offlineMsg.remove();
                }
            }, 5000);
        }
    }

    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('online', function() {
        // Recharger la page si on revient en ligne
        location.reload();
    });
});

// ===== FONCTIONS UTILITAIRES =====

// Fonction pour formater les numéros de téléphone
function formatPhoneNumber(phoneNumber) {
    // Enlever tous les caractères non numériques
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Formater selon le standard malgache
    if (cleaned.length === 9) {
        return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{3})/, '+261 $1 $2 $3 $4');
    }
    return phoneNumber;
}

// Fonction pour copier un texte dans le presse-papier
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Copié dans le presse-papier !');
    }, function(err) {
        console.error('Erreur lors de la copie: ', err);
    });
}

// Ajouter la possibilité de copier les numéros de téléphone
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumbers = document.querySelectorAll('.contact-item p');
    phoneNumbers.forEach(item => {
        if (item.textContent.includes('+261')) {
            item.style.cursor = 'pointer';
            item.title = 'Cliquer pour copier';
            item.addEventListener('click', function() {
                copyToClipboard(this.textContent);
            });
        }
    });
});