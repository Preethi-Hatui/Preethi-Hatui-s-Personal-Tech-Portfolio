document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (sidebar && sidebar.classList.contains('show')) {
                    sidebar.classList.remove('show');
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.glass-nav');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Tablet simulator functionality
    const tabletSimulator = document.getElementById('tabletSimulator');
    const showTabletBtn = document.getElementById('showTabletBtn');
    const tabletClose = document.getElementById('tabletClose');
    const homeButton = document.getElementById('homeButton');
   

    if (showTabletBtn && tabletSimulator) {
        showTabletBtn.addEventListener('click', () => {
            tabletSimulator.style.display = 'flex';
            tabletSimulator.querySelector('.tablet').classList.add('show');
            notificationPanel.classList.remove('show');
            updateTabletTime();
        });
    }

	// Update your tablet close functionality
	if (tabletClose && tabletSimulator) {
		tabletClose.addEventListener('click', () => {
			tabletSimulator.querySelector('.tablet').classList.remove('show');
			setTimeout(() => {
				tabletSimulator.style.display = 'none';
				notificationPanel.classList.remove('show');
				// Scroll to top after closing
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: 'smooth'
				});
			}, 400);
		});
	}

    if (homeButton && tabletSimulator) {
        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            tabletSimulator.querySelector('.tablet').classList.remove('show');
            setTimeout(() => {
                tabletSimulator.style.display = 'none';
                notificationPanel.classList.remove('show');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 400);
        });
    }

    // Tablet navigation links
    document.querySelectorAll('.tablet-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                tabletSimulator.querySelector('.tablet').classList.remove('show');
                setTimeout(() => {
                    tabletSimulator.style.display = 'none';
                    notificationPanel.classList.remove('show');
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 400);
            }
        });
    });

    // Update tablet time
    function updateTabletTime() {
        const now = new Date();
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');

        if (timeElement && dateElement) {
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
            timeElement.textContent = time;
            dateElement.textContent = date;
        }
    }
    setInterval(updateTabletTime, 1000);
    updateTabletTime();

    // Simulate network speed changes
    function updateNetworkSpeed() {
        const speeds = ['72 Mbps', '128 Mbps', '90 Mbps', '160 Mbps', '116 Mbps'];
        const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
        const networkSpeedElement = document.getElementById('network-speed');
        if (networkSpeedElement) {
            networkSpeedElement.textContent = randomSpeed;
        }
    }
    setInterval(updateNetworkSpeed, 6000);

    // Simulate battery drain
    let battery = 85;
    function updateBatteryDrain() {
        battery = battery > 20 ? battery - 1 : 85;
        const batteryPercentElement = document.getElementById('battery-percent');
        const batteryLevelElement = document.querySelector('.battery-level');

        if (batteryPercentElement && batteryLevelElement) {
            batteryPercentElement.textContent = `${battery}%`;
            batteryLevelElement.style.width = `${battery}%`;
            batteryLevelElement.style.background = battery < 20 ? '#ff0000' : 'var(--accent-color)';
        }
    }
    setInterval(updateBatteryDrain, 12000);

    

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, 200);
        });
    }

    // Section visibility on scroll with slide animations
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('align-left')) {
                    entry.target.style.animation = 'slideInLeft 0.5s ease forwards';
                } else if (entry.target.classList.contains('align-right')) {
                    entry.target.style.animation = 'slideInRight 0.5s ease forwards';
                } else if (entry.target.classList.contains('light-beam')) {
                    entry.target.style.animation = 'lightBeam 0.8s ease forwards';
                } else {
                    entry.target.style.animation = 'bounceIn 0.5s ease forwards';
                }
                if (entry.target.id === 'Skills') {
                    animateSkillBars();
                }
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Project card visibility
    const projectCards = document.querySelectorAll('.project-card, .app-icon, .timeline-item, .certifications li');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('popup-card')) {
                    entry.target.style.animation = 'popupCard 0.6s ease forwards';
                }
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    projectCards.forEach(card => {
        cardObserver.observe(card);
    });

    // Popup animation for navigation links
    document.querySelectorAll('.popup').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'popupNav 0.3s ease forwards';
        });
        link.addEventListener('mouseleave', () => {
            link.style.animation = 'none';
        });
    });

    // Randomize bubble animations
    document.querySelectorAll('.bubble').forEach((bubble, index) => {
        bubble.style.animationDelay = `${index * 0.5}s`;
    });

    // Enhanced project card animations
    document.querySelectorAll('.project-card, .app-icon').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.05)';
            card.style.boxShadow = `0 20px 40px rgba(91, 78, 255, 0.6)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--glass-shadow)';
        });
    });

    // Copy email functionality with smooth tooltip
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const email = button.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const tooltip = button.nextElementSibling;
                if (tooltip) {
                    tooltip.style.animation = 'fadeInTooltip 0.3s ease forwards';
                    tooltip.classList.add('show');
                    setTimeout(() => {
                        tooltip.style.animation = 'fadeOutTooltip 0.3s ease forwards';
                        setTimeout(() => {
                            tooltip.classList.remove('show');
                        }, 300);
                    }, 1500);
                }
            });
        });
    });

    // Cursor trail effect
    const cursorTrail = document.querySelector('.cursor-trail');
    if (cursorTrail) {
        document.addEventListener('mousemove', (e) => {
            cursorTrail.style.left = `${e.clientX - 10}px`;
            cursorTrail.style.top = `${e.clientY - 10}px`;
        });
    }

    // Tilt effect for skill cards and other elements
    document.querySelectorAll('.tilt').forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = -(y / rect.height) * 15;
            const tiltY = (x / rect.width) * 15;
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // Tablet touch animation
    const screen = document.querySelector('.screen');
    if (screen) {
        screen.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('touch-ripple');
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;
            screen.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});