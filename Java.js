const images = document.querySelectorAll('.ellipse-image');
const ellipseContainer = document.getElementById('ellipseContainer');

// Função para calcular uma posição inicial dentro da elipse
const calculateInitialPosition = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radiusX = ellipseContainer.offsetWidth / 2 - 75;
    const radiusY = ellipseContainer.offsetHeight / 2 - 75;

    const angle = Math.random() * 2 * Math.PI;

    const initialX = centerX + radiusX * Math.cos(angle);
    const initialY = centerY + radiusY * Math.sin(angle);

    return { x: initialX, y: initialY, scale: 0.8 + Math.random() * 0.4 };
};

// Centraliza o contêiner na tela
gsap.set(ellipseContainer, { xPercent: -50, yPercent: -50, top: '50%', left: '50%' });

// Define a posição inicial e tamanho das imagens
gsap.set(images, calculateInitialPosition());

// Cria a animação
gsap.to(images, {
    x: () => Math.random() * (window.innerWidth - 150),
    y: () => Math.random() * (window.innerHeight - 150),
    scale: () => 0.8 + Math.random() * 0.4,
    rotation: 0,
    duration: 3,
    repeat: -1,
    ease: 'power1.inOut',
    stagger: {
        amount: 1,
        grid: 'auto',
        from: 'center',
    },
});

// Atualiza a posição inicial e tamanho quando o tamanho da janela é alterado
window.addEventListener('resize', () => {
    gsap.set(images, calculateInitialPosition());
});






