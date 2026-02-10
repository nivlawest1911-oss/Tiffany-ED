
# PowerShell Script to Generate EdIntel Voice Asset
# Uses Windows System.Speech

$text = "Greetings. I am Doctor West. Welcome to the EdIntel Intelligence Platform. Access granted. Proceed with your protocol."
$filename = "public\voice-profiles\principal_voice.wav"
$absolutePath = Join-Path $(Get-Location) $filename

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Configure Voice (Attempt to select a male voice)
$voices = $synth.GetInstalledVoices()
foreach ($v in $voices) {
    if ($v.VoiceInfo.Gender -eq 'Male') {
        $synth.SelectVoice($v.VoiceInfo.Name)
        break
    }
}

$synth.SetOutputToWaveFile($absolutePath)
$synth.Speak($text)
$synth.SetOutputToNull()

Write-Host "✅ Voice Identity Synthesized: $absolutePath"
