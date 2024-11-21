class Solution {
public:
    string convert(string s, int numRows) {
        if(numRows == 1) return s;
        
        vector<string> zigZag(numRows, "");
        string res = "";
        int n = s.length();
        int row = 0;
        bool isDown = true;

        for(int i = 0; i < n; i++){
            zigZag[row] += s[i];
            if(row == numRows - 1){
                isDown = false;
            } else if (row == 0) {
                isDown = true;
            }

            if(isDown) row++;
            else row--;
        }

        for(int i = 0; i < numRows; i++){
            res += zigZag[i];
        }

        return res;
    }
};
