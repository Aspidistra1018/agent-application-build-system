

# Script to ensure .vscode/settings.json exists by copying from template
# This script creates default VSCode settings if none exist

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
VSCODE_DIR="$PROJECT_ROOT/.vscode"
SETTINGS_FILE="$VSCODE_DIR/settings.json"
TEMPLATE_FILE="$VSCODE_DIR/settings.template.json"

# Function to log messages (only when VERBOSE=true)
log() {
    if [[ "${VERBOSE:-false}" == "true" ]]; then
        echo "[setup-vscode-settings] $1"
    fi
}

# Create .vscode directory if it doesn't exist
if [[ ! -d "$VSCODE_DIR" ]]; then
    log "Creating .vscode directory..."
    mkdir -p "$VSCODE_DIR"
fi

# Check if settings.json exists
if [[ ! -f "$SETTINGS_FILE" ]]; then
    log "settings.json not found"
    
    # Check if template file exists
    if [[ -f "$TEMPLATE_FILE" ]]; then
        log "Copying settings.template.json to settings.json..."
        cp "$TEMPLATE_FILE" "$SETTINGS_FILE"
        log "✓ settings.json created from template"
    else
        log "Warning: settings.template.json not found, creating minimal settings.json..."
        
        # Create a minimal settings.json if template doesn't exist
        cat > "$SETTINGS_FILE" << 'EOF'
{
  "search.exclude": {
    "**/node_modules": true,
    "**/common/temp": true,
    "**/.rush": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/common/temp": true,
    "**/.rush": true
  }
}
EOF
        log "✓ Minimal settings.json created"
    fi
else
    log "settings.json already exists, skipping..."
fi