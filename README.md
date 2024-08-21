# vud-tokens
Tokens for VUD Design System Library
Generates CSS and SCSS files based on SPCS Figma Configuration

## Build instructions
`npm run` executes the main build script, compiling the local SPCS Figma configuration (Token folder) into SCSS and CSS files. The output is stored in the /build folder.

`npm run build_fix` executes the build script as well as run two code migration scripts on the generated code, fixing some issues that has been introduced in the build script.

`npm run build_fix_sync_vsbp` executes the build script and the migration tools as well as copies the output to a pre-defined folder on the hard drive. This is a utility script for Visma Skatt & Bokslut Pro for copying the generated code to Visma Skatt & Bokslut Pro code base.