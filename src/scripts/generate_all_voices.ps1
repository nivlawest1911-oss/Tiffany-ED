
# PowerShell Script to Generate ALL EdIntel Voice Assets
# Uses Windows System.Speech

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

function Generate-Voice($text, $filename, $gender) {
    $absolutePath = Join-Path $(Get-Location) "public\voice-profiles\$filename"
    
    # Reset Voice
    $voices = $synth.GetInstalledVoices()
    foreach ($v in $voices) {
        if ($v.VoiceInfo.Gender -eq $gender) {
            $synth.SelectVoice($v.VoiceInfo.Name)
            break
        }
    }

    $synth.SetOutputToWaveFile($absolutePath)
    $synth.Speak($text)
    $synth.SetOutputToNull()
    Write-Host "✅ Voice Online: $filename ($gender)"
}

# 1. Counselor (Female)
Generate-Voice "Greetings. I am your EdIntel Counselor. Let us optimize for student well-being and success." "counselor_voice.wav" "Female"

# 2. Data Analyst / Compliance (Male/Neutral - reusing Male if Female not distinct or vice versa, usually systems have one of each)
Generate-Voice "EdIntel Data Systems Online. Analyzing metrics for strategic advantage." "data_voice.wav" "Male"

# 3. Compliance (Distinct message)
Generate-Voice "Compliance Protocol Initiated. Verifying regulatory standards and statutes." "compliance_voice.wav" "Male"

Write-Host "✅ All Identity Assets Synthesized."
