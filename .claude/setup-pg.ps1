# Tasinabilir PostgreSQL kurulumu (Docker/WSL2 calismadigi icin).
# .pgsql = binariler, .pgdata = veri dizini, port 5434 (.env ile ayni).
$ErrorActionPreference = "Stop"
$root = "C:\Projeler\emparos"
$pgRoot = Join-Path $root ".pgsql"
$pgData = Join-Path $root ".pgdata"
$zipPath = Join-Path $env:TEMP "pg-binaries.zip"

$candidates = @(
  "https://get.enterprisedb.com/postgresql/postgresql-17.5-1-windows-x64-binaries.zip",
  "https://get.enterprisedb.com/postgresql/postgresql-17.4-1-windows-x64-binaries.zip",
  "https://get.enterprisedb.com/postgresql/postgresql-17.6-1-windows-x64-binaries.zip",
  "https://get.enterprisedb.com/postgresql/postgresql-17.2-1-windows-x64-binaries.zip",
  "https://get.enterprisedb.com/postgresql/postgresql-16.9-1-windows-x64-binaries.zip"
)

if (-not (Test-Path (Join-Path $pgRoot "pgsql\bin\initdb.exe"))) {
  $downloaded = $false
  foreach ($url in $candidates) {
    try {
      Write-Output "Deneniyor: $url"
      Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $zipPath -TimeoutSec 900
      $downloaded = $true
      Write-Output "Indirildi: $url"
      break
    } catch {
      Write-Output "Olmadi: $($_.Exception.Message)"
    }
  }
  if (-not $downloaded) { throw "Hicbir PostgreSQL binary adresi calismadi" }
  Expand-Archive -Path $zipPath -DestinationPath $pgRoot -Force
  Remove-Item $zipPath -Force
}

$bin = Join-Path $pgRoot "pgsql\bin"
if (-not (Test-Path (Join-Path $pgData "PG_VERSION"))) {
  & (Join-Path $bin "initdb.exe") -D $pgData -U emparos -E UTF8 -A trust --locale=C
}

# Zaten calisiyorsa tekrar baslatma
$running = $false
try {
  & (Join-Path $bin "pg_isready.exe") -p 5434 -h localhost | Out-Null
  if ($LASTEXITCODE -eq 0) { $running = $true }
} catch {}
if (-not $running) {
  & (Join-Path $bin "pg_ctl.exe") -D $pgData -o "-p 5434" -l (Join-Path $root ".pgdata\pg.log") -w start
}

# emparos veritabanini olustur (yoksa)
$dbExists = & (Join-Path $bin "psql.exe") -p 5434 -h localhost -U emparos -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='emparos'"
if ($dbExists -ne "1") {
  & (Join-Path $bin "createdb.exe") -p 5434 -h localhost -U emparos emparos
}
& (Join-Path $bin "pg_isready.exe") -p 5434 -h localhost
Write-Output "POSTGRES HAZIR (port 5434)"
