/**
 * Skillatinaya Interaction Engine 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Scroll Effect
    const nav = document.getElementById('mainNav');
    
    const handleScroll = () => {
        if (window.scrollY > 40) {
            nav?.classList.add('nav-scrolled');
        } else {
            nav?.classList.remove('nav-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 2. Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Stats Counter Animation (Only runs if counters exist on page)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds animation
                    const startTime = performance.now();
                    
                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out quad formula
                        const currentCount = Math.floor(progress * target);
                        
                        // Formatting the output
                        if (target >= 1000) {
                            counter.innerText = (currentCount / 1000).toFixed(target % 1000 === 0 ? 0 : 1) + 'k+';
                        } else if (target === 35) {
                            counter.innerText = currentCount + '%';
                        } else {
                            counter.innerText = currentCount + '+';
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            // Final fix to ensure exact target is shown
                            if (target === 12000) counter.innerText = '12k+';
                            else if (target === 35) counter.innerText = '35%';
                            else counter.innerText = target + '+';
                        }
                    };
                    
                    requestAnimationFrame(updateCount);
                });
                countObserver.disconnect();
            }
        }, { threshold: 0.5 });

        countObserver.observe(counters[0]);
    }

    // 4. Smooth Anchor Scrolling for same-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
