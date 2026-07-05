

set -e

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Setup VSCode settings if needed
bash "$SCRIPT_DIR/setup-vscode-settings.sh"

