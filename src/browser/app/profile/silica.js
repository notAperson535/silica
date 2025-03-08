// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

#ifdef XP_UNIX
  #ifndef XP_MACOSX
    #define UNIX_BUT_NOT_MAC
  #endif
#endif

// Sets to dark mode
pref("browser.theme.toolbar-theme", 0);

#ifdef XP_MACOSX
// macOS Vibrancy
pref('widget.macos.titlebar-blend-mode.behind-window', true);
pref('widget.macos.sidebar-blend-mode.behind-window', true);
pref("browser.theme.native-theme", true);
#endif