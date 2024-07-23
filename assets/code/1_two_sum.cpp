class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;

    for(int i = 0; i < nums.size(); i++){
        map[nums[i]] = i;
    }

    for(int i = 0; i < nums.size(); i++){
      int diff = target - nums[i];
      if(map.find(diff) != map.end() && i != map[diff]){
          return {i, map[diff]};
      }
    }
    
    return {}; 
  }
};
