# PowerShell script to fix blog article headers by removing Sign In/Sign Up buttons

$blogPath = "src/pages/blog"
$files = Get-ChildItem -Path $blogPath -Filter "*.tsx"

foreach ($file in $files) {
    Write-Host "Fixing $($file.Name)..."
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove the Sign In/Sign Up button section
    # This pattern matches the div with Sign In/Sign Up buttons and all the empty lines
    $pattern = '(?s)\s*<div className="flex items-center space-x-2">\s*<button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">\s*Sign In\s*</button>\s*<button className="px-4 py-2 text-sm border border-input bg-background rounded-md hover:bg-accent">\s*Sign Up\s*</button>\s*</div>'
    
    # Try the pattern
    $newContent = $content -replace $pattern, ""
    
    # If content changed, write it back
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "  ✓ Fixed $($file.Name)"
    } else {
        Write-Host "  - No changes needed for $($file.Name)"
    }
}

Write-Host "Blog header fix complete!"