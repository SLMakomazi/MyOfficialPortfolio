// Preview Image Generator
function generatePreviewImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions (1200x630 for optimal social media)
    canvas.width = 1200;
    canvas.height = 630;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#1a1a1a');
    gradient.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add radial gradient overlays
    const radialGradient1 = ctx.createRadialGradient(240, 315, 0, 240, 315, 200);
    radialGradient1.addColorStop(0, 'rgba(0, 212, 255, 0.1)');
    radialGradient1.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const radialGradient2 = ctx.createRadialGradient(960, 315, 0, 960, 315, 200);
    radialGradient2.addColorStop(0, 'rgba(255, 0, 255, 0.1)');
    radialGradient2.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load and draw profile image with outline
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        // Draw glow effect
        ctx.save();
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Draw circular clipping path
        ctx.beginPath();
        ctx.arc(240, 315, 120, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Draw image
        ctx.drawImage(img, 120, 195, 240, 240);
        ctx.restore();
        
        // Draw border
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(240, 315, 120, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add glow ring
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(240, 315, 124, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw text content
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText('Siseko Makomazi', 420, 250);
        
        // Create gradient for title
        const textGradient = ctx.createLinearGradient(420, 280, 800, 280);
        textGradient.addColorStop(0, '#00d4ff');
        textGradient.addColorStop(1, '#ff00ff');
        ctx.fillStyle = textGradient;
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText('Siseko Makomazi', 420, 250);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = '24px Inter, sans-serif';
        ctx.fillText('DevOps Engineer & Full Stack Developer', 420, 300);
        
        // Description
        ctx.fillStyle = '#cccccc';
        ctx.font = '18px Inter, sans-serif';
        const description = 'Specializing in cloud technologies, CI/CD pipelines,';
        ctx.fillText(description, 420, 340);
        ctx.fillText('containerization, and modern web development.', 420, 365);
        
        // Skill tags
        const skills = ['DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'];
        let xPos = 420;
        let yPos = 410;
        
        skills.forEach((skill, index) => {
            // Skill tag background
            ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
            ctx.fillRect(xPos, yPos, 120, 35);
            
            // Skill tag border
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(xPos, yPos, 120, 35);
            
            // Skill tag text
            ctx.fillStyle = '#00d4ff';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(skill, xPos + 60, yPos + 23);
            
            xPos += 130;
            if (index === 2) {
                xPos = 420;
                yPos += 45;
            }
        });
        
        // Add decorative code elements
        ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.font = '20px JetBrains Mono, monospace';
        ctx.fillText('</>', 1050, 50);
        ctx.fillText('{...}', 50, 580);
        ctx.fillText('DevOps', 1050, 580);
        
        // Convert to blob and download
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'portfolio-preview.jpg';
            a.click();
            URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.9);
    };
    
    img.src = 'professionalImage.jpeg';
}

// Auto-generate preview image
if (typeof window !== 'undefined') {
    window.generatePreviewImage = generatePreviewImage;
    console.log('🎨 Preview image generator loaded. Call generatePreviewImage() to create preview.');
}
