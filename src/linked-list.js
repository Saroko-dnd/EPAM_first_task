const Node = require('./node');

class LinkedList {

    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        if (this._tail == null) {
            this._head = new Node(data, null, null);
            this._tail = this._head;
        } else {
            this._tail.next = new Node(data, this._tail, null);
            this._tail = this._tail.next;
        }
        this.length += 1;

        return this;
    }

    head() {
        if (this._head == null) {
            return null;
        }
        return this._head.data;
    }

    tail() {
        if (this._tail == null) {
            return null;
        }
        return this._tail.data;
    }

    at(index) {
        var NodeWithData = this._head;
        for (var CurrentIndex = 0; CurrentIndex < index; ++CurrentIndex) {
            NodeWithData = NodeWithData.next;
        }
        return NodeWithData.data;
    }

    insertAt(index, data) {
        var BufferForNextNode = this._head;
        for (var CurrentIndex = 0; CurrentIndex < index; ++CurrentIndex) {
            BufferForNextNode = BufferForNextNode.next;
        }
        if (BufferForNextNode == null) {
            if (this._tail == null) {
                this.append(data);
            } else {
                this._tail.next = new Node(data, this._tail, BufferForNextNode);
                this._tail = this._tail.next;
            }
        } else {
            var BufferForPrevNode = BufferForNextNode.prev;
            BufferForNextNode.prev = new Node(data, BufferForPrevNode, BufferForNextNode);
            BufferForPrevNode.next = BufferForNextNode.prev;
        }

        this.length += 1;

        return this;
    }

    isEmpty() {
        if (this.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        var BufferForNode = this._head;
        for (var CurrentIndex = 0; CurrentIndex < index; ++CurrentIndex) {
            BufferForNode = BufferForNode.next;
        }
        if (BufferForNode.prev != null && BufferForNode.next != null) {
            BufferForNode.prev.next = BufferForNode.next;
            BufferForNode.next.prev = BufferForNode.prev;
        } else {
            if (BufferForNode.prev == null) {
                this._head = BufferForNode.next;
            } else {
                BufferForNode.prev.next = BufferForNode.next;
            }
            if (BufferForNode.next == null) {
                this._tail = BufferForNode.prev;
            } else {
                BufferForNode.next.prev = BufferForNode.prev;
            }
        }

        this.length -= 1;

        return this;
    }

    reverse() {
        if (this._head != null && this.length > 1) {
            var IndexFromHead = 0;
            var IndexFromTail = this.length - 1;
            var NodeFromHead = this._head;
            var NodeFromTail = this._tail;
            var BufferForData;
            while (IndexFromHead < IndexFromTail) {
                BufferForData = NodeFromHead.data;
                NodeFromHead.data = NodeFromTail.data;
                NodeFromTail.data = BufferForData;
                NodeFromHead = NodeFromHead.next;
                NodeFromTail = NodeFromTail.prev;
                ++IndexFromHead;
                --IndexFromTail;
            }
        }
        return this;
    }

    indexOf(data) {
        var ResultIndex = -1;
        var index = 0;
        var BufferForNode = this._head;

        while (BufferForNode != null && ResultIndex == -1) {
            if (BufferForNode.data == data) {
                ResultIndex = index;
            }
            ++index;
            BufferForNode = BufferForNode.next;
        }

        return ResultIndex;
    }
}

module.exports = LinkedList;
