class Solution {
public:
  int expand(string s, int left, int right) {
    while (left >= 0 && right < s.length() && s[left] == s[right]) {
      left--;
      right++;
    }
    
    return right - left - 1;
  }

  string longestPalindrome(string s) {
    int longest = 0;
    int start = 0;

    for (int i = 0; i < s.length(); i++) {
      int odd = expand(s, i, i);
      int even = expand(s, i - 1, i);
      int length = max(odd, even);

      if (length > longest) {
        start = i - (length / 2);
        longest = length;
      }
    }

    return s.substr(start, longest);
  }
};
