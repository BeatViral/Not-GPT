$env:Path = "C:\Users\mahmo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:Path"
$env:CI = "true"
Set-Location "C:\Users\mahmo\OneDrive\Desktop\NOT GPT"
& "C:\Users\mahmo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" ".\node_modules\next\dist\bin\next" dev --hostname 127.0.0.1 --port 3100 *> ".\dev-server.log"
