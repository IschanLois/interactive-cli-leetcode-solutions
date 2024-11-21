class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        set<char> sub;
        int max = 0;
        int curLength = 0;
        int curStart = 0;
        
        for(int i = 0; i < s.length(); i++){
            auto pos = sub.find(s[i]);
            if(pos != sub.end()){
                if(curLength > max){
                    max = curLength;
                }
                while(pos != sub.end()){
                    sub.erase(s[curStart]);
                    pos = sub.find(s[i]);
                    curStart++;
                    curLength--;
                }
            }
            sub.insert(s[i]);
            curLength++;
        }
        if(curLength > max) max = curLength;

        return max;
    }
};
