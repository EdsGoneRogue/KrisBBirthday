// Set your buddy's birthday here (year, month-1, day, hour, minute, second)
// Note: month is 0-indexed (0 = January, 9 = October)
let birthdayDate = new Date(2025, 9,8, 0, 0, 0); // October 8, 2025

function setup() {
  // Make canvas responsive - fill the window
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}

function windowResized() {
  // Automatically resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Create gradient background
  for(let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(20, 30, 80), color(100, 50, 150), inter);
    stroke(c);
    line(0, i, width, i);
  }
  
  // Get current time
  let now = new Date();
  
  // Check if today is the birthday (same month and day)
  let todayMonth = now.getMonth();
  let todayDay = now.getDate();
  let birthdayMonth = birthdayDate.getMonth();
  let birthdayDay = birthdayDate.getDate();
  
  if (todayMonth === birthdayMonth && todayDay === birthdayDay) {
    // It's the birthday today!
    displayBirthdayMessage();
  } else {
    // Calculate time until next birthday
    let nextBirthday = new Date(now.getFullYear(), birthdayMonth, birthdayDay);
    
    // If this year's birthday has already passed, use next year
    if (nextBirthday.getTime() <= now.getTime()) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    
    let timeDiff = nextBirthday.getTime() - now.getTime();
    displayCountdown(timeDiff);
  }
  
  // Add some birthday decorations
  drawDecorations();
}

// Helper function to draw text with outline
function drawTextWithOutline(txt, x, y, fillCol, strokeCol, strokeW) {
  // Draw outline
  fill(strokeCol);
  for(let i = -strokeW; i <= strokeW; i++) {
    for(let j = -strokeW; j <= strokeW; j++) {
      if(i !== 0 || j !== 0) {
        text(txt, x + i, y + j);
      }
    }
  }
  // Draw main text
  fill(fillCol);
  text(txt, x, y);
}

// Helper function to draw glowing text
function drawGlowingText(txt, x, y, mainColor, glowColor, glowSize) {
  // Draw glow layers
  for(let i = glowSize; i > 0; i--) {
    fill(red(glowColor), green(glowColor), blue(glowColor), 30 * (glowSize - i + 1) / glowSize);
    for(let angle = 0; angle < TWO_PI; angle += PI/4) {
      text(txt, x + cos(angle) * i, y + sin(angle) * i);
    }
  }
  // Draw main text
  fill(mainColor);
  text(txt, x, y);
}

function displayCountdown(timeDiff) {
  // Calculate time units
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  // Fixed text sizes that work well on all devices
  let isMobile = width < 600;
  
  // Title with glow effect
  textSize(isMobile ? 28 : 48);
  textStyle(BOLD);
  drawGlowingText("🎉 BIRTHDAY COUNTDOWN 🎉", width/2, height * 0.35, 
                  color(255, 255, 150), color(255, 215, 0), isMobile ? 3 : 5);
  
  // Buddy's name with outline
  textSize(isMobile ? 22 : 32);
  textStyle(NORMAL);
  drawTextWithOutline("Kris's Birthday!", width/2, height * 0.42, 
                      color(255, 200, 255), color(100, 0, 100), 2);
  
  // Countdown display - scale text based on screen size
  if (isMobile) {
    // Mobile: try horizontal first, fallback to vertical for very small screens
    let scaleFactor = constrain(width / 400, 0.4, 1);
    let numberSize = 32 * scaleFactor;
    let labelSize = 16 * scaleFactor;
    
    // Try to fit horizontally first
    let testText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    textSize(numberSize);
    let textW = textWidth(testText);
    
    if (textW < width - 40) {
      // Horizontal layout fits
      let yPos = height * 0.5;
      textAlign(CENTER, CENTER);
      
      textSize(numberSize);
      textStyle(BOLD);
      
      let displayText = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
      drawTextWithOutline(displayText, width/2, yPos, 
                          color(255, 255, 255), color(0, 0, 0), Math.max(1, numberSize / 20));
      
      fill(255, 200, 255);
      textSize(labelSize * 1.2);
      text("till Kris birthday", width/2, yPos + 40 * scaleFactor);
      
    } else {
      // Vertical layout for very small screens
      let yPos = height * 0.4;
      let spacing = height * 0.06;
      
      textAlign(CENTER, CENTER);
      
      // Days
      textSize(numberSize);
      textStyle(BOLD);
      drawTextWithOutline(days.toString(), width/2, yPos, 
                          color(255, 255, 255), color(0, 0, 0), Math.max(1, numberSize / 20));
      fill(255);
      textSize(labelSize);
      textStyle(NORMAL);
      text("days", width/2, yPos + 25 * scaleFactor);
      
      // Hours
      yPos += spacing;
      textSize(numberSize);
      textStyle(BOLD);
      drawTextWithOutline(hours.toString(), width/2, yPos, 
                          color(255, 255, 255), color(0, 0, 0), Math.max(1, numberSize / 20));
      fill(255);
      textSize(labelSize);
      textStyle(NORMAL);
      text("hours", width/2, yPos + 25 * scaleFactor);
      
      // Minutes
      yPos += spacing;
      textSize(numberSize);
      textStyle(BOLD);
      drawTextWithOutline(minutes.toString(), width/2, yPos, 
                          color(255, 255, 255), color(0, 0, 0), Math.max(1, numberSize / 20));
      fill(255);
      textSize(labelSize);
      textStyle(NORMAL);
      text("min", width/2, yPos + 25 * scaleFactor);
      
      // Seconds
      yPos += spacing;
      textSize(numberSize);
      textStyle(BOLD);
      drawTextWithOutline(seconds.toString(), width/2, yPos, 
                          color(255, 255, 255), color(0, 0, 0), Math.max(1, numberSize / 20));
      fill(255);
      textSize(labelSize);
      textStyle(NORMAL);
      text("sec", width/2, yPos + 25 * scaleFactor);
      
      // "till Kris birthday"
      yPos += spacing;
      fill(255, 200, 255);
      textSize(labelSize * 1.2);
      text("till Kris birthday", width/2, yPos);
    }
    
  } else {
    // Desktop: horizontal sentence format with proper spacing
    let yPos = height * 0.5;
    
    textAlign(LEFT, CENTER);
    
    // Calculate positions for proper spacing
    let baseX = width/2 - 250;
    let currentX = baseX;
    
    // "X days"
    textSize(48);
    textStyle(BOLD);
    drawGlowingText(days.toString(), currentX, yPos, 
                    color(255, 255, 255), color(100, 150, 255), 3);
    currentX += textWidth(days.toString()) + 10;
    
    textSize(24);
    textStyle(NORMAL);
    text("days", currentX, yPos);
    currentX += textWidth("days") + 20;
    
    // "X hours"
    textSize(48);
    textStyle(BOLD);
    drawGlowingText(hours.toString(), currentX, yPos, 
                    color(255, 255, 255), color(100, 150, 255), 3);
    currentX += textWidth(hours.toString()) + 10;
    
    textSize(24);
    textStyle(NORMAL);
    text("hours", currentX, yPos);
    currentX += textWidth("hours") + 20;
    
    // "X min"
    textSize(48);
    textStyle(BOLD);
    drawGlowingText(minutes.toString(), currentX, yPos, 
                    color(255, 255, 255), color(100, 150, 255), 3);
    currentX += textWidth(minutes.toString()) + 10;
    
    textSize(24);
    textStyle(NORMAL);
    text("min", currentX, yPos);
    currentX += textWidth("min") + 20;
    
    // "X sec"
    textSize(48);
    textStyle(BOLD);
    drawGlowingText(seconds.toString(), currentX, yPos, 
                    color(255, 255, 255), color(100, 150, 255), 3);
    currentX += textWidth(seconds.toString()) + 10;
    
    textSize(24);
    textStyle(NORMAL);
    text("sec", currentX, yPos);
    
    // "till Kris birthday"
    fill(255, 200, 255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("till Kris birthday", width/2+250, yPos + 60);
  }
  
  // Birthday date
  // fill(200, 200, 255);
  // textSize(isMobile ? 14 : 18);
  // textStyle(NORMAL);
  // let dateString = birthdayDate.toLocaleDateString('en-US', { 
  //   weekday: 'long', 
  //   year: 'numeric', 
  //   month: 'long', 
  //   day: 'numeric' 
  // });
  //text("Birthday: " + dateString, width/2, height * 0.85);
}

function displayBirthdayMessage() {
  let isMobile = width < 600;
  
  // Birthday celebration message
  fill(255, 100, 150);
  textSize(isMobile ? 32 : 48);
  textStyle(BOLD);
  text("🎂 HAPPY BIRTHDAY! 🎂", width/2, height/2 - 50);
  
  fill(255, 255, 100);
  textSize(isMobile ? 20 : 32);
  text("Hope you have an amazing day!", width/2, height/2 + 20);
  
  // Animate some excitement
  let bounce = sin(frameCount * 0.2) * 10;
  fill(255, 200, 255);
  textSize(isMobile ? 18 : 24);
  text("🎈 Party Time! 🎈", width/2, height/2 + 80 + bounce);
}



function drawDecorations() {
  let time = frameCount * 0.05;
  let isMobile = width < 600;
  
  // Floating balloons - simpler scaling
  let balloonMargin = isMobile ? 50 : 100;
  
  // Balloon 1
  let balloon1X = balloonMargin + sin(time) * 30;
  let balloon1Y = height * 0.1 + cos(time * 0.7) * 40;
  drawBalloon(balloon1X, balloon1Y, color(255, 100, 100));
  
  // Balloon 2
  let balloon2X = width - balloonMargin + sin(time + PI) * 35;
  let balloon2Y = height * 0.15 + cos(time * 0.5) * 50;
  drawBalloon(balloon2X, balloon2Y, color(100, 100, 255));
  
  // Confetti
  let confettiCount = isMobile ? 8 : 15;
  for(let i = 0; i < confettiCount; i++) {
    let confettiX = (i * (width / confettiCount) + sin(time + i) * 15) % width;
    let confettiY = (i * 40 + cos(time * 0.8 + i) * 20) % height;
    fill(random(100, 255), random(100, 255), random(100, 255));
    noStroke();
    ellipse(confettiX, confettiY, isMobile ? 4 : 6, isMobile ? 4 : 6);
  }
  
  // Diagonal decoration string from top right to bottom left
  let decorationCount = isMobile ? 6 : 10;
  for(let i = 0; i < 2*decorationCount; i++) {
    let progress = i / (2*decorationCount - 1); // 0 to 1
    
    // Base diagonal line from top right to bottom left
    let baseX = width - (progress * width);
    let baseY = progress * .25*height;
    
    // Add some gentle wave motion
    let waveOffset = sin(time + i * 0.5) * 20;
    let decorX = baseX + waveOffset;
    let decorY = baseY + cos(time * 0.6 + i * 0.3) * 15;
    
    // Draw star decorations
    push();
    translate(decorX, decorY);
    rotate(time + i);
    
    // Star colors - mix of gold and white
    if(i % 2 == 0) {
      fill(255, 215, 0, 180); // Gold
    } else {
      fill(255, 255, 255, 180); // White
    }
    
    noStroke();
    
    // Draw simple star
    let starSize = isMobile ? 8 : 12;
    drawStar(0, 0, starSize * 0.3, starSize, 5);
    
    pop();
  }
}

function drawBalloon(x, y, balloonColor) {
  let isMobile = width < 600;
  let size = isMobile ? 0.7 : 1;
  
  // Balloon string
  stroke(100);
  strokeWeight(2 * size);
  line(x, y + 25 * size, x, y + 60 * size);
  
  // Balloon
  fill(balloonColor);
  noStroke();
  ellipse(x, y, 30 * size, 40 * size);
  
  // Balloon highlight
  fill(255, 255, 255, 100);
  ellipse(x - 5 * size, y - 8 * size, 8 * size, 12 * size);
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
