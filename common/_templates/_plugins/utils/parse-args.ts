import process from 'process';

// parseArgs.ts
export function parseCommandLineArguments() {
  const args = process.argv.slice(2);
  const result: Record<string, string> = {};

  // Loop through all parameters
  for (let i = 0; i < args.length; i++) {
    // Check if the current argument is an option (starting with "--").
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2); // Remove the "--" prefix

      // Check if the next argument exists and is not another option
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result[key] = args[i + 1]; // Set the next argument as the value of the current option
        i++; // Skip the next argument because it has already been processed to the value of the current option
      } else {
        result[key] = ''; // If there is no value, only set the key of the option
      }
    }
  }

  return result;
}
