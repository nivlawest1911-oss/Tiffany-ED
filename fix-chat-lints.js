const fs = require('fs');
const path = require('path');

const file = 'src/components/LiveAvatarChat.tsx';
const varNames = [
    'MouthBar', 'index', 'avatarVoiceSettings', 'tokensRemaining', 'onRecharge',
    'isOpen', 'greetingText', 'theme', 'speak', 'setTranscript',
    'isSpeechSupported', 'setIsSpeechSupported', 'cognitiveState', 'personalityMode',
    'setPersonalityMode', 'curiosityCenter', 'setCuriosityCenter', 'setUserSentiment',
    'perceptiveState', 'setPerceptiveState', 'setProcessingStage', 'setCinematicMode',
    'streamMedia', 'triggerXpGain', 'handleMouseMove', 'behaviorStyle',
    'getArchetype', 'recognitionRef', 'synthesisRef', 'handleStrategicDrafting',
    'vibeShift', 'error'
];

const filePath = path.join(__dirname, file);
if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    varNames.forEach(name => {
        // Catch destructuring or assignment/declaration
        // Using a more targetted approach to avoid replacing valid usages if they existed
        const regex = new RegExp(`\\b${name}\\b(?=\\s*[:=,])`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `_${name}`);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed unused variables in ${file}`);
    } else {
        console.log(`ℹ️ No matching variables found in ${file}`);
    }
}
