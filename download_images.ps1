# PowerShell script to download images and update markdown file
# Set output encoding to UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$mdFile = "E:\Projects\my-blog\docs\backend-base\spring\spring.md"
$imagesDir = "E:\Projects\my-blog\docs\backend-base\spring\images"

# Create images directory if not exists
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

# Read the markdown file
$content = Get-Content $mdFile -Raw -Encoding UTF8

# Find all image URLs
$pattern = '!\[([^\]]*)\]\((https?://[^)]+)\)'
$matches = [regex]::Matches($content, $pattern)

Write-Host "Found $($matches.Count) image links"

$downloadedCount = 0
$skippedCount = 0

foreach ($match in $matches) {
    $altText = $match.Groups[1].Value
    $url = $match.Groups[2].Value
    
    # Clean URL (remove anchor)
    $cleanUrl = $url -split '#' | Select-Object -First 1
    
    # Extract filename from URL
    $filename = [System.IO.Path]::GetFileName([System.Uri]::UnescapeDataString($cleanUrl))
    
    # If filename is too long or invalid, generate one
    if ($filename.Length -gt 100 -or $filename -notmatch '\.') {
        $hash = [System.BitConverter]::ToString([System.Security.Cryptography.MD5]::Create().ComputeHash([System.Text.Encoding]::UTF8.GetBytes($cleanUrl))).Replace('-', '').Substring(0, 8).ToLower()
        $ext = [System.IO.Path]::GetExtension([System.Uri]::UnescapeDataString($cleanUrl))
        if ([string]::IsNullOrEmpty($ext)) { $ext = '.png' }
        $filename = "$hash$ext"
    }
    
    Write-Host "Processing: $filename"
    
    # Check if already processed in this run
    if ($global:processedUrls -contains $cleanUrl) {
        Write-Host "  Skip duplicate URL" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    try {
        # Download the image
        $outputPath = Join-Path $imagesDir $filename
        
        # Handle duplicate filenames
        $counter = 1
        $baseFilename = $filename
        while (Test-Path $outputPath) {
            $name = [System.IO.Path]::GetFileNameWithoutExtension($baseFilename)
            $ext = [System.IO.Path]::GetExtension($baseFilename)
            $filename = "${name}_${counter}${ext}"
            $outputPath = Join-Path $imagesDir $filename
            $counter++
        }
        
        # Download using Invoke-WebRequest with better header support
        try {
            $headers = @{
                "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                "Accept" = "image/webp,image/apng,image/*,*/*;q=0.8"
                "Referer" = "https://www.nlark.com/"
            }
            Invoke-WebRequest -Uri $cleanUrl -OutFile $outputPath -Headers $headers -UseBasicParsing -TimeoutSec 30 | Out-Null
        } catch {
            # Fallback to WebClient if Invoke-WebRequest fails
            $webClient = New-Object System.Net.WebClient
            $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
            $webClient.Headers.Add("Accept", "image/webp,image/apng,image/*,*/*;q=0.8")
            $webClient.DownloadFile($cleanUrl, $outputPath)
            $webClient.Dispose()
        }
        
        Write-Host "  Success: $filename" -ForegroundColor Green
        $downloadedCount++
        
        # Track processed URLs
        if (-not $global:processedUrls) {
            $global:processedUrls = @()
        }
        $global:processedUrls += $cleanUrl
        
        # Replace in content
        $oldLink = "![$altText]($url)"
        $newLink = "![$altText](images/$filename)"
        $content = $content.Replace($oldLink, $newLink)
        
    } catch {
        Write-Host "  Failed: $_" -ForegroundColor Red
    }
}

# Save the updated markdown file
$content | Set-Content $mdFile -Encoding UTF8 -NoNewline

Write-Host "`nCompleted!" -ForegroundColor Green
Write-Host "Successfully downloaded: $downloadedCount images"
Write-Host "Skipped duplicates: $skippedCount images"
Write-Host "Images saved to: $imagesDir"
