class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  getLoadFactor() {
    let loadFactor = this.count / this.capacity;

    while (loadFactor > 0.7) {
      this.resize();
      loadFactor = this.count / this.capacity;
    }
    return loadFactor;
  }

  insert(key, value) {
    this.getLoadFactor();
    let pair = new KeyValuePair(key, value);
    let bucket = this.hashMod(key);
    let current = this.data[bucket];

    if (current) {
      while (current) {
        if (current.key === key) {
          return current.value = value;
        } else {
          current = current.next;
        }
      }
    } else {
      this.data[bucket] = pair;
      this.count++;
      return;
    }

    pair.next = this.data[bucket];
    this.data[bucket] = pair;
    this.count++;
  }


  read(key) {
    let bucket = this.hashMod(key);
    let current = this.data[bucket];

    while (current) {
      if (current.key === key) {
        return current.value;
      } else {
        current = current.next;
      }
    }
  }


  resize() {
    this.capacity *= 2;
    let oldData = this.data;

    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    for (let i = 0; i < oldData.length; i++) {
      let data = oldData[i];

      while (data) {
        this.insert(data.key, data.value);
        data = data.next;
      }
    }
  }


  delete(key) {
    let bucket = this.hashMod(key);
    let current = this.data[bucket];

    if (current === null) {
      return 'Key not found';
    }

    if (current.key === key) {
      this.data[bucket] = current.next;
      this.count--;
      return current.value;
    }

    while (current.next) {
      if (current.next.key === key) {
        let currentNext = current.next;
        current.next = current.next.next;
        this.count--;
        return currentNext.value;
      }
      current = current.next;
    }
    return 'Key not found';
  }
}


module.exports = HashTable;
