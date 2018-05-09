#
# Developer: Ryan Valizan
# Project: Storefront Image Conversions
# Purpose: Convert png to jpg for storefront upload.
#

# Setting our script home path variable
		# Script Home Directory
			$scriptPath = (Get-Item -Path ".\").FullName

	Write-Output "Script path set. $scriptPath"

# Set directory variables
	$imgsRootDir = (Get-Item -Path "..\").FullName
	$packetImgsRootDir = "$imgsRootDir\Packets"
	$exportDir = "$imgsRootDir\Images\Exports"

    Write-Output $imgsRootDir
    Write-Output $packetImgsRootDir
    Write-Output $exportDir
	Write-Output "Image directories set."

function ConvertTo-Jpg
{
    [cmdletbinding()]
    param([Parameter(Mandatory=$true, ValueFromPipeline = $true)] $Path)

    process{
        if ($Path -is [string])
        { $Path = get-childitem $Path }
			$Path | foreach {
				Write-Output $Path
				$image = [System.Drawing.Image]::FromFile($($_.FullName));
				$FilePath = [IO.Path]::ChangeExtension($_.FullName, '.jpg');
				$image.Save($FilePath, [System.Drawing.Imaging.ImageFormat]::Jpeg);
				$image.Dispose();
			}
	}

 }

	 #Use function:
	 #Cd to directory w/ png files
	 Set-Location $packetImgsRootDir

 #Run ConvertTo-Jpg function
 #Get-ChildItem *.png -Exclude *_th.png, *_lg.png, *_md.png -Recurse | ConvertTo-Jpg
Get-ChildItem *.png -Filter *_lg* -Recurse | ConvertTo-Jpg

 # $OldRoot = 'Top-level of old files'
# $DestRoot = 'Top-level of destination'
# Go to old root so relative paths are correct



Set-Location $packetImgsRootDir
	# Get all the images, then for each one...
		Get-ChildItem -Recurse -Include "*.jpeg", "*.jpg" | 
		ForEach-Object { 
				# Save full name to avoid issues later
				$Source = $_.FullName
				
				# Construct destination filename using relative path and destination root
				$Destination = '{0}\{1}' -f $exportDir, (Resolve-Path -Relative -Path:$Source).TrimStart('.\')

				# If new destination doesn't exist, create it
				If(-Not (Test-Path ($exportDir = Split-Path -Parent -Path:$Destination))) { 
					New-Item -Type:Directory -Path:$exportDir -Force -Verbose 
				}

				# Copy old item to new destination
				Move-Item -Path:$Source -Destination:$Destination -Verbose -Force
		}
		# Rename the files to remove _lg
		Set-Location $exportDir
			Get-ChildItem -Recurse -Include "*.jpeg", "*.jpg" |Rename-Item -NewName {$_.name -replace '_lg',''}